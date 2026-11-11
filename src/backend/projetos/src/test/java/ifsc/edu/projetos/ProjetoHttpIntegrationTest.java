package ifsc.edu.projetos;

import com.jayway.jsonpath.JsonPath;
import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.login.security.JwtUtil;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjetoHttpIntegrationTest {

    private static final String JWT_SECRET = "chave-de-integracao-com-mais-de-trinta-e-dois-bytes";

    @DynamicPropertySource
    static void configurarTeste(DynamicPropertyRegistry registry) {
        registry.add("spring.mongodb.uri", ProjetoHttpIntegrationTest::uriBancoDeTeste);
        registry.add("app.jwt.secret", () -> JWT_SECRET);
    }

    @Value("${local.server.port}")
    private int porta;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final HttpClient http = HttpClient.newHttpClient();
    private String tituloTeste;
    private String usuarioCriadoId;

    @AfterEach
    void removerDadosDeTeste() {
        if (tituloTeste != null) {
            projetoRepository.findAll().stream()
                    .filter(projeto -> tituloTeste.equals(projeto.getTitulo()))
                    .forEach(projetoRepository::delete);
        }
        if (usuarioCriadoId != null) {
            userRepository.deleteById(usuarioCriadoId);
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

    private User novoUsuario() {
        User usuario = new User();
        usuario.setNome("Usuario de teste");
        usuario.setEmail(UUID.randomUUID() + "@example.com");
        usuario.setPassword("hash-de-teste");
        User salvo = userRepository.save(usuario);
        usuarioCriadoId = salvo.getId();
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
