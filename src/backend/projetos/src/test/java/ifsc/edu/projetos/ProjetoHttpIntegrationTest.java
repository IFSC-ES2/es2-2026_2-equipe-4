package ifsc.edu.projetos;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.login.security.JwtUtil;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
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
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

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
    void publicaComTokenEUsaAutorDoUsuarioAutenticado() throws Exception {
        User usuario = novoUsuario();
        tituloTeste = "Projeto de teste " + UUID.randomUUID();
        String token = jwtUtil.generateToken(usuario.getEmail());

        HttpResponse<String> resposta = publicar("Bearer " + token);

        assertEquals(201, resposta.statusCode(), resposta.body());
        Projeto salvo = projetoRepository.findAll().stream()
                .filter(projeto -> tituloTeste.equals(projeto.getTitulo()))
                .findFirst()
                .orElseThrow();
        assertNotNull(salvo.getId());
        assertNotEquals("id-enviado-pelo-cliente", salvo.getId());
        assertEquals(usuario.getId(), salvo.getAutorId());
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
