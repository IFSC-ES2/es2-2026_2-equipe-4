package ifsc.edu.projetos;

import com.jayway.jsonpath.JsonPath;
import com.mongodb.client.gridfs.model.GridFSFile;
import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.login.security.JwtUtil;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjetoHttpIntegrationTest {

    private static final String JWT_SECRET = "chave-de-integracao-com-mais-de-trinta-e-dois-bytes";

    // PNG de um pixel: permite testar o envio sem depender de um arquivo no computador.
    private static final byte[] IMAGEM_PNG = Base64.getDecoder().decode(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=");

    @DynamicPropertySource
    static void configurarTeste(DynamicPropertyRegistry registry) {
        registry.add("spring.mongodb.uri", ProjetoHttpIntegrationTest::uriBancoDeTeste);
        registry.add("app.jwt.secret", () -> JWT_SECRET);
        registry.add("app.seed.projetos.enabled", () -> "false");
    }

    @Value("${local.server.port}")
    private int porta;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    private final HttpClient http = HttpClient.newHttpClient();
    private String tituloTeste;
    private final List<String> usuariosCriadosIds = new ArrayList<>();
    private String nomeArquivoTeste;

    @AfterEach
    void removerDadosDeTeste() {
        if (tituloTeste != null) {
            projetoRepository.findAll().stream()
                    .filter(projeto -> tituloTeste.equals(projeto.getTitulo()))
                    .forEach(projetoRepository::delete);
        }
        if (nomeArquivoTeste != null) {
            // Remove somente o arquivo deste teste e os pedacos dele salvos no GridFS.
            gridFsTemplate.delete(Query.query(Criteria.where("filename").is(nomeArquivoTeste)));
        }
        for (String usuarioId : usuariosCriadosIds) {
            userRepository.deleteById(usuarioId);
        }
    }

    @Test
    @DisplayName("Publica com o autor do token e permite consulta pública com imagem padrão")
    @Timeout(30) // Limita a duracao para uma falha na paginacao nao prender o teste.
    void publicaComTokenEPermiteConsultaPublicaComImagemPadrao() throws Exception {
        // Preparar: criar um usuário e um token válido
        User usuario = novoUsuario();
        tituloTeste = "Projeto de teste " + UUID.randomUUID();
        String token = jwtUtil.generateToken(usuario.getEmail());

        // Executar: publicar sem enviar imagens
        HttpResponse<String> resposta = publicar("Bearer " + token);
        assertEquals(201, resposta.statusCode(), resposta.body());

        // JsonPath lê os campos do JSON: $.id é o ID devolvido pela API.
        String idPublicado = JsonPath.read(resposta.body(), "$.id");
        assertNotNull(idPublicado);
        assertNotEquals("id-enviado-pelo-cliente", idPublicado);

        // Conferir o documento realmente salvo no MongoDB
        Projeto salvo = projetoRepository.findById(idPublicado).orElseThrow();
        assertEquals(tituloTeste, salvo.getTitulo());
        assertEquals("Resumo de teste", salvo.getResumo());
        assertEquals(usuario.getId(), salvo.getAutorId());

        List<String> imagensPadrao = List.of(
                "/imagens-padrao/fundo-projeto-padrao-1.jpg",
                "/imagens-padrao/fundo-projeto-padrao-2.jpg",
                "/imagens-padrao/fundo-projeto-padrao-3.jpg");
        assertNotNull(salvo.getImagens());
        assertEquals(1, salvo.getImagens().size());
        assertTrue(imagensPadrao.contains(salvo.getImagens().get(0)));

        // Consultar o projeto por ID sem mandar token
        HttpResponse<String> consulta = consultarSemToken("/projetos/" + idPublicado);
        assertEquals(200, consulta.statusCode(), consulta.body());

        String idConsultado = JsonPath.read(consulta.body(), "$.id");
        String tituloConsultado = JsonPath.read(consulta.body(), "$.titulo");
        String resumoConsultado = JsonPath.read(consulta.body(), "$.resumo");
        String autorConsultado = JsonPath.read(consulta.body(), "$.autorId");
        List<String> imagensConsultadas = JsonPath.read(consulta.body(), "$.imagens");

        assertEquals(idPublicado, idConsultado);
        assertEquals(tituloTeste, tituloConsultado);
        assertEquals("Resumo de teste", resumoConsultado);
        assertEquals(usuario.getId(), autorConsultado);
        assertEquals(salvo.getImagens(), imagensConsultadas);

        // Conferir a listagem pública, sem depender da posição do projeto na lista
        int pagina = 0;
        boolean projetoEncontrado = false;
        boolean ultimaPagina = false;
        while (!projetoEncontrado && !ultimaPagina) {
            HttpResponse<String> listagem = consultarSemToken("/projetos?page=" + pagina + "&size=100");
            assertEquals(200, listagem.statusCode(), listagem.body());

            List<String> idsNaPagina = JsonPath.read(listagem.body(), "$.content[*].id");
            projetoEncontrado = idsNaPagina.contains(idPublicado);
            ultimaPagina = JsonPath.read(listagem.body(), "$.last");
            pagina++;
        }
        assertTrue(projetoEncontrado, "O projeto publicado deve aparecer na listagem sem login");
    }

    @Test
    void rejeitaPublicacaoSemTokenSemGravarProjeto() throws Exception {
        tituloTeste = "Projeto sem token " + UUID.randomUUID();

        HttpResponse<String> resposta = publicar(null);

        assertEquals(401, resposta.statusCode(), resposta.body());
        assertFalse(projetoRepository.findAll().stream()
                .anyMatch(projeto -> tituloTeste.equals(projeto.getTitulo())));
    }

    @Test
    void rejeitaPublicacaoComTokenInvalidoSemGravarProjeto() throws Exception {
        tituloTeste = "Projeto com token invalido " + UUID.randomUUID();

        HttpResponse<String> resposta = publicar("Bearer token-invalido");

        assertEquals(401, resposta.statusCode(), resposta.body());
        assertFalse(projetoRepository.findAll().stream()
                .anyMatch(projeto -> tituloTeste.equals(projeto.getTitulo())));
    }

    @Test
    @DisplayName("O autor troca a imagem e o arquivo enviado fica salvo no GridFS")
    @Timeout(30)
    void autorPodeTrocarImagemEGravarArquivoNoGridFs() throws Exception {
        // Preparar: um projeto com imagem padrao e o token do dono.
        User autor = novoUsuario();
        Projeto projeto = novoProjetoComImagemPadrao(autor);
        String token = jwtUtil.generateToken(autor.getEmail());

        // Executar: enviar uma imagem pela API real.
        HttpResponse<String> resposta = trocarImagem(projeto.getId(), "Bearer " + token);
        assertEquals(200, resposta.statusCode(), resposta.body());

        String idRespondido = JsonPath.read(resposta.body(), "$.id");
        List<String> imagensRespondidas = JsonPath.read(resposta.body(), "$.imagens");
        assertEquals(projeto.getId(), idRespondido);
        assertEquals(1, imagensRespondidas.size());
        String idImagem = imagensRespondidas.get(0);
        assertTrue(ObjectId.isValid(idImagem), "A imagem deve receber um ID do GridFS");

        // Conferir: a imagem mudou no Mongo e os demais dados foram preservados.
        Projeto salvo = projetoRepository.findById(projeto.getId()).orElseThrow();
        assertEquals(List.of(idImagem), salvo.getImagens());
        assertEquals(projeto.getAutorId(), salvo.getAutorId());
        assertEquals(projeto.getTitulo(), salvo.getTitulo());
        assertEquals(projeto.getResumo(), salvo.getResumo());

        // Conferir tambem o arquivo real, incluindo o conteudo enviado.
        GridFSFile arquivo = gridFsTemplate.findOne(
                Query.query(Criteria.where("_id").is(new ObjectId(idImagem))));
        assertNotNull(arquivo, "O ID da imagem deve apontar para um arquivo salvo");
        assertEquals(nomeArquivoTeste, arquivo.getFilename());
        assertEquals((long) IMAGEM_PNG.length, arquivo.getLength());
        assertNotNull(arquivo.getMetadata());
        assertEquals("image/png", arquivo.getMetadata().getString("contentType"));

        try (InputStream conteudoSalvo = gridFsTemplate.getResource(arquivo).getInputStream()) {
            assertArrayEquals(IMAGEM_PNG, conteudoSalvo.readAllBytes());
        }
    }

    @Test
    @DisplayName("Outro usuario nao troca a imagem nem deixa um arquivo salvo")
    @Timeout(30)
    void outroUsuarioNaoPodeTrocarImagemNemGravarArquivo() throws Exception {
        // Preparar: o projeto pertence ao autor, mas o token e de outra pessoa.
        User autor = novoUsuario();
        Projeto projeto = novoProjetoComImagemPadrao(autor);
        User outroUsuario = novoUsuario();
        String token = jwtUtil.generateToken(outroUsuario.getEmail());

        HttpResponse<String> resposta = trocarImagem(projeto.getId(), "Bearer " + token);

        Projeto salvo = projetoRepository.findById(projeto.getId()).orElseThrow();
        GridFSFile arquivo = gridFsTemplate.findOne(
                Query.query(Criteria.where("filename").is(nomeArquivoTeste)));

        // Atualmente o controller responde 400 para esta falta de permissao.
        assertAll("A tentativa deve ser bloqueada sem alterar o projeto ou salvar arquivo",
                () -> assertEquals(400, resposta.statusCode(), resposta.body()),
                () -> assertEquals("Apenas o autor pode alterar a imagem do projeto",
                        JsonPath.read(resposta.body(), "$.erro")),
                () -> assertEquals(projeto, salvo, "Os dados do projeto devem permanecer iguais"),
                () -> assertNull(arquivo, "O arquivo enviado por outro usuario nao deve ser salvo"));
    }

    @Test
    @DisplayName("Sem token nao troca a imagem nem deixa um arquivo salvo")
    @Timeout(30)
    void semTokenNaoPodeTrocarImagemNemGravarArquivo() throws Exception {
        User autor = novoUsuario();
        Projeto projeto = novoProjetoComImagemPadrao(autor);

        HttpResponse<String> resposta = trocarImagem(projeto.getId(), null);

        Projeto salvo = projetoRepository.findById(projeto.getId()).orElseThrow();
        GridFSFile arquivo = gridFsTemplate.findOne(
                Query.query(Criteria.where("filename").is(nomeArquivoTeste)));

        assertAll("Sem autenticacao, o projeto e o armazenamento devem permanecer intactos",
                () -> assertEquals(401, resposta.statusCode(), resposta.body()),
                () -> assertEquals(projeto, salvo, "Os dados do projeto devem permanecer iguais"),
                () -> assertNull(arquivo, "O arquivo enviado sem token nao deve ser salvo"));
    }

    private Projeto novoProjetoComImagemPadrao(User autor) {
        tituloTeste = "Projeto para troca de imagem " + UUID.randomUUID();
        Projeto projeto = new Projeto();
        projeto.setTitulo(tituloTeste);
        projeto.setResumo("Resumo original do projeto");
        projeto.setAutorId(autor.getId());
        projeto.setImagens(List.of("/imagens-padrao/fundo-projeto-padrao-1.jpg"));
        return projetoRepository.save(projeto);
    }

    private HttpResponse<String> trocarImagem(String projetoId, String autorizacao)
            throws IOException, InterruptedException {
        nomeArquivoTeste = "troca-imagem-" + UUID.randomUUID() + ".png";
        String separador = "teste-" + UUID.randomUUID();

        // Multipart e o formato usado para enviar um arquivo em uma requisicao HTTP.
        String inicio = "--" + separador + "\r\n"
                + "Content-Disposition: form-data; name=\"arquivo\"; filename=\"" + nomeArquivoTeste + "\"\r\n"
                + "Content-Type: image/png\r\n\r\n";
        String fim = "\r\n--" + separador + "--\r\n";
        HttpRequest.BodyPublisher corpo = HttpRequest.BodyPublishers.ofByteArrays(List.of(
                inicio.getBytes(StandardCharsets.UTF_8), IMAGEM_PNG, fim.getBytes(StandardCharsets.UTF_8)));

        HttpRequest.Builder request = HttpRequest.newBuilder(
                        URI.create("http://127.0.0.1:" + porta + "/api/v1/projetos/" + projetoId + "/imagem"))
                .header("Content-Type", "multipart/form-data; boundary=" + separador)
                .PUT(corpo);
        if (autorizacao != null) {
            request.header("Authorization", autorizacao);
        }
        return http.send(request.build(), HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }

    private User novoUsuario() {
        User usuario = new User();
        usuario.setNome("Usuario de teste");
        usuario.setEmail(UUID.randomUUID() + "@example.com");
        usuario.setPassword("hash-de-teste");
        User salvo = userRepository.save(usuario);
        usuariosCriadosIds.add(salvo.getId());
        return salvo;
    }

    private HttpResponse<String> publicar(String autorizacao) throws IOException, InterruptedException {
        String corpo = "{\"id\":\"id-enviado-pelo-cliente\",\"autorId\":\"outro-autor\","
                + "\"titulo\":\"" + tituloTeste + "\",\"resumo\":\"Resumo de teste\"}";
        HttpRequest.Builder request = HttpRequest.newBuilder(
                        URI.create("http://127.0.0.1:" + porta + "/api/v1/projetos/metadados"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(corpo, StandardCharsets.UTF_8));
        if (autorizacao != null) {
            request.header("Authorization", autorizacao);
        }
        return http.send(request.build(), HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }

    private HttpResponse<String> consultarSemToken(String rota) throws IOException, InterruptedException {
        // Este request não possui o cabeçalho Authorization.
        HttpRequest request = HttpRequest.newBuilder(
                        URI.create("http://127.0.0.1:" + porta + "/api/v1" + rota))
                .GET()
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }


    private static String uriBancoDeTeste() {
        String uriExplicita = System.getenv("TEST_MONGODB_URI");
        if (uriExplicita != null && !uriExplicita.isBlank()) {
            return uriExplicita;
        }

        String configurada = System.getenv("SPRING_MONGODB_URI");
        if (configurada == null || configurada.isBlank()) {
            configurada = "mongodb://admin:admin123@localhost:27017/publicaifsc?authSource=admin";
        }

        URI origem = URI.create(configurada);
        try {
            return new URI(origem.getScheme(), origem.getUserInfo(), origem.getHost(), origem.getPort(),
                    "/publicaifsc_auth_test", origem.getQuery(), null).toString();
        } catch (URISyntaxException ex) {
            throw new IllegalArgumentException("URI do MongoDB inválida para o teste", ex);
        }
    }
}
