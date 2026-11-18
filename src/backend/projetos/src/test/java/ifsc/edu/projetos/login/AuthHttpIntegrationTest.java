package ifsc.edu.projetos.login;

import com.jayway.jsonpath.JsonPath;
import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.login.security.JwtUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

    @Autowired
    private MongoTemplate mongoTemplate;

    private final HttpClient http = HttpClient.newHttpClient();
    private String emailCriado;
    private String emailOutroUsuario;

    @AfterEach
    void removerUsuariosCriados() {
        if (emailCriado != null) {
            mongoTemplate.remove(consultaPorEmail(emailCriado), User.class);
        }
        if (emailOutroUsuario != null) {
            mongoTemplate.remove(consultaPorEmail(emailOutroUsuario), User.class);
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

        HttpResponse<String> sessao = get("/auth/token", "Bearer " + token);
        assertEquals(200, sessao.statusCode(), sessao.body());
        assertEquals("Token válido", JsonPath.read(sessao.body(), "$.mensagem"));
        assertEquals(salvo.getId(), JsonPath.read(sessao.body(), "$.userId"));
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

        User outro = new User();
        outro.setEmail(emailCriado);
        outro.setNome("Outro usuário de teste");
        outro.setPassword("hash-de-teste");
        assertThrows(DuplicateKeyException.class, () -> userRepository.insert(outro));
    }

    @Test
    void cadastrosConcorrentesCriamUmaUnicaConta() throws Exception {
        emailCriado = emailAleatorio();
        String rota = "/users/createAccount/0.0.1/novousers";
        HttpRequest primeiraRequisicao = requisicaoPostJson(rota, jsonUsuario(emailCriado, "senha123"));
        HttpRequest segundaRequisicao = requisicaoPostJson(rota,
                jsonUsuario(emailCriado.toUpperCase(Locale.ROOT), "senha123"));

        var primeiroEnvio = http.sendAsync(primeiraRequisicao, HttpResponse.BodyHandlers.ofString());
        var segundoEnvio = http.sendAsync(segundaRequisicao, HttpResponse.BodyHandlers.ofString());
        HttpResponse<String> primeira = primeiroEnvio.get(15, TimeUnit.SECONDS);
        HttpResponse<String> segunda = segundoEnvio.get(15, TimeUnit.SECONDS);

        List<Integer> codigos = List.of(primeira.statusCode(), segunda.statusCode()).stream().sorted().toList();
        assertEquals(List.of(201, 409), codigos, () -> primeira.body() + " / " + segunda.body());
        assertEquals(1L, mongoTemplate.count(consultaPorEmail(emailCriado), User.class));
    }

    @Test
    void usuarioPodeAtualizarEExcluirPropriaConta() throws Exception {
        emailCriado = emailAleatorio();
        String rotaConta = "/users/createAccount/0.0.1";
        HttpResponse<String> cadastro = postJson(rotaConta + "/novousers", jsonUsuario(emailCriado, "senha123"));
        assertEquals(201, cadastro.statusCode(), cadastro.body());
        String id = JsonPath.read(cadastro.body(), "$.userId");
        String token = loginEObterToken(emailCriado);

        String alteracao = """
                {"nome":"Nome atualizado","email":"%s","password":"novaSenha123"}
                """.formatted(emailCriado);
        HttpRequest atualizar = HttpRequest.newBuilder(URI.create(baseUrl() + rotaConta + "/atualizar"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .PUT(HttpRequest.BodyPublishers.ofString(alteracao, StandardCharsets.UTF_8))
                .build();
        HttpResponse<String> atualizada = http.send(atualizar, HttpResponse.BodyHandlers.ofString());
        assertEquals(200, atualizada.statusCode(), atualizada.body());
        assertEquals(id, JsonPath.read(atualizada.body(), "$.userId"));
        User usuario = userRepository.findById(id).orElseThrow();
        assertEquals("Nome atualizado", usuario.getNome());
        assertEquals(emailCriado, usuario.getEmail());
        assertTrue(passwordEncoder.matches("novaSenha123", usuario.getPassword()));
        assertFalse(passwordEncoder.matches("senha123", usuario.getPassword()));

        HttpRequest excluir = HttpRequest.newBuilder(URI.create(baseUrl() + rotaConta + "/delete/" + id))
                .header("Authorization", "Bearer " + token)
                .DELETE()
                .build();
        HttpResponse<String> excluida = http.send(excluir, HttpResponse.BodyHandlers.ofString());
        assertEquals(204, excluida.statusCode(), excluida.body());
        assertTrue(excluida.body().isEmpty());
        assertFalse(userRepository.existsById(id));
        assertEquals(401, get("/auth/token", "Bearer " + token).statusCode());
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

    @Test
    @DisplayName("Um usuário não pode alterar o nome ou a senha de outra conta")
    void usuarioNaoPodeAlterarOutraConta() throws Exception {
        // Preparar: cadastrar os usuários A e B
        emailCriado = emailAleatorio();
        emailOutroUsuario = emailAleatorio();

        assertEquals(201, postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailCriado, "senha123")).statusCode());
        assertEquals(201, postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailOutroUsuario, "senha123")).statusCode());

        String tokenDoUsuarioA = loginEObterToken(emailCriado);
        User usuarioBAntes = userRepository.findByEmail(emailOutroUsuario).orElseThrow();
        String nomeOriginal = usuarioBAntes.getNome();
        String senhaOriginal = usuarioBAntes.getPassword();

        String alteracao = "{\"nome\":\"Nome alterado por outro usuario\",\"email\":\""
                + emailOutroUsuario + "\",\"password\":\"nova-senha123\"}";

        // Executar: usar o token de A para tentar alterar a conta de B
        HttpRequest request = HttpRequest.newBuilder(
                        URI.create(baseUrl() + "/users/createAccount/0.0.1/atualizar"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + tokenDoUsuarioA)
                .PUT(HttpRequest.BodyPublishers.ofString(alteracao, StandardCharsets.UTF_8))
                .build();
        HttpResponse<String> resposta = http.send(
                request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        // Conferir a resposta e consultar novamente os dados salvos de B
        User usuarioBDepois = userRepository.findById(usuarioBAntes.getId()).orElseThrow();
        // assertAll executa todas as verificações, mesmo se uma delas falhar.
        // 403 significa que o usuário está autenticado, mas não tem permissão.
        assertAll("A tentativa deve ser recusada e a conta de B deve permanecer intacta",
                () -> assertEquals(403, resposta.statusCode(), resposta.body()),
                () -> assertEquals(nomeOriginal, usuarioBDepois.getNome(),
                        "O nome da conta de B não pode ser alterado por A"),
                () -> assertEquals(senhaOriginal, usuarioBDepois.getPassword(),
                        "A senha da conta de B não pode ser alterada por A"));
    }

    @Test
    @DisplayName("Um usuário não pode excluir a conta de outro")
    void usuarioNaoPodeExcluirOutraConta() throws Exception {
        // Preparar: cadastrar os usuários A e B
        emailCriado = emailAleatorio();
        emailOutroUsuario = emailAleatorio();

        assertEquals(201, postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailCriado, "senha123")).statusCode());
        assertEquals(201, postJson("/users/createAccount/0.0.1/novousers",
                jsonUsuario(emailOutroUsuario, "senha123")).statusCode());

        String tokenDoUsuarioA = loginEObterToken(emailCriado);
        User usuarioB = userRepository.findByEmail(emailOutroUsuario).orElseThrow();

        // Executar: usar o token de A para tentar excluir a conta de B
        HttpRequest request = HttpRequest.newBuilder(
                        URI.create(baseUrl() + "/users/createAccount/0.0.1/delete/" + usuarioB.getId()))
                .header("Authorization", "Bearer " + tokenDoUsuarioA)
                .DELETE()
                .build();
        HttpResponse<String> resposta = http.send(
                request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        // Conferir que a operação foi recusada e que B continua no banco
        boolean contaBExiste = userRepository.existsById(usuarioB.getId());
        assertAll("A tentativa deve ser recusada e a conta de B não pode ser excluída",
                () -> assertEquals(403, resposta.statusCode(), resposta.body()),
                () -> assertTrue(contaBExiste, "A conta de B deve continuar existindo"));
    }

    private String loginEObterToken(String email) throws IOException, InterruptedException {
        HttpResponse<String> resposta = postJson("/auth/login",
                "{\"email\":\"" + email + "\",\"password\":\"senha123\"}");
        assertEquals(200, resposta.statusCode(), resposta.body());

        Matcher tokenJson = TOKEN_JSON.matcher(resposta.body());
        assertTrue(tokenJson.find(), resposta.body());
        return tokenJson.group(1);
    }


    private HttpResponse<String> postJson(String rota, String json) throws IOException, InterruptedException {
        return http.send(requisicaoPostJson(rota, json), HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
    }

    private HttpRequest requisicaoPostJson(String rota, String json) {
        return HttpRequest.newBuilder(URI.create(baseUrl() + rota))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();
    }

    private Query consultaPorEmail(String email) {
        return Query.query(Criteria.where("email").is(email));
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
