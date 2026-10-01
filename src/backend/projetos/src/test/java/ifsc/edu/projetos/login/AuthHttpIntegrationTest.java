package ifsc.edu.projetos.login;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.login.security.JwtUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthHttpIntegrationTest {

    private static final String JWT_SECRET = "chave-de-integracao-com-mais-de-trinta-e-dois-bytes";
    private static final Pattern TOKEN_JSON = Pattern.compile("\"token\"\\s*:\\s*\"([^\"]+)\"");

    @DynamicPropertySource
    static void configurarTeste(DynamicPropertyRegistry registry) {
        registry.add("spring.mongodb.uri", AuthHttpIntegrationTest::uriBancoDeTeste);
        registry.add("app.jwt.secret", () -> JWT_SECRET);
    }

    @Value("${local.server.port}")
    private int porta;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final HttpClient http = HttpClient.newHttpClient();
    private String emailCriado;

    @AfterEach
    void removerUsuarioCriado() {
        if (emailCriado != null) {
            userRepository.findByEmail(emailCriado).ifPresent(userRepository::delete);
        }
    }

    @Test
    void cadastroLoginEProtecaoPorTokenFuncionamJuntos() throws Exception {
        emailCriado = emailAleatorio();
        String emailInformado = emailCriado.toUpperCase();

        HttpResponse<String> cadastro = postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailInformado, "senha123"));
        assertEquals(201, cadastro.statusCode(), cadastro.body());

        User salvo = userRepository.findByEmail(emailCriado).orElseThrow();
        assertFalse("senha123".equals(salvo.getPassword()));
        assertTrue(passwordEncoder.matches("senha123", salvo.getPassword()));

        HttpResponse<String> login = postJson("/auth/login",
                "{\"email\":\"" + emailInformado + "\",\"password\":\"senha123\"}");
        assertEquals(200, login.statusCode(), login.body());
        Matcher tokenJson = TOKEN_JSON.matcher(login.body());
        assertTrue(tokenJson.find(), login.body());
        String token = tokenJson.group(1);

        assertEquals(200, get("/auth/token", "Bearer " + token).statusCode());
        assertEquals(401, get("/auth/token", null).statusCode());
        assertEquals(401, get("/auth/token", "Bearer token-invalido").statusCode());

        String expirado = new JwtUtil(JWT_SECRET, -60_000).generateToken(emailCriado);
        assertEquals(401, get("/auth/token", "Bearer " + expirado).statusCode());

        HttpResponse<String> senhaErrada = postJson("/auth/login",
                "{\"email\":\"" + emailCriado + "\",\"password\":\"errada123\"}");
        assertEquals(401, senhaErrada.statusCode(), senhaErrada.body());
    }

    @Test
    void cadastroRejeitaEmailDuplicadoMesmoComMaiusculas() throws Exception {
        emailCriado = emailAleatorio();

        assertEquals(201, postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailCriado, "senha123")).statusCode());
        HttpResponse<String> duplicado = postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailCriado.toUpperCase(), "senha123"));

        assertEquals(409, duplicado.statusCode(), duplicado.body());
    }

    @Test
    void cadastroELoginRejeitamDadosInvalidos() throws Exception {
        HttpResponse<String> cadastro = postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario("email-invalido", "123"));
        HttpResponse<String> login = postJson("/auth/login",
                "{\"email\":\"email-invalido\",\"password\":\"123\"}");

        assertEquals(400, cadastro.statusCode(), cadastro.body());
        assertEquals(400, login.statusCode(), login.body());
    }

    private HttpResponse<String> postJson(String rota, String json) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(baseUrl() + rota))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }

    private HttpResponse<String> get(String rota, String autorizacao) throws IOException, InterruptedException {
        HttpRequest.Builder request = HttpRequest.newBuilder(URI.create(baseUrl() + rota)).GET();
        if (autorizacao != null) {
            request.header("Authorization", autorizacao);
        }
        return http.send(request.build(), HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }

    private String baseUrl() {
        return "http://127.0.0.1:" + porta + "/api/v1";
    }

    private String emailAleatorio() {
        return UUID.randomUUID() + "@example.com";
    }

    private String jsonUsuario(String email, String senha) {
        return "{\"nome\":\"Usuario de teste\",\"email\":\"" + email
                + "\",\"password\":\"" + senha + "\"}";
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
