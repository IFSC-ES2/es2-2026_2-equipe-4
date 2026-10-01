package ifsc.edu.projetos.login.security;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtUtilTest {

    private static final String SECRET = "chave-de-teste-com-mais-de-trinta-e-dois-bytes";

    @Test
    void geraTokenAssinadoParaOUsuarioCorreto() {
        JwtUtil jwtUtil = new JwtUtil(SECRET, 60_000);
        String token = jwtUtil.generateToken("juliano@example.com");

        assertEquals("juliano@example.com", jwtUtil.extractUsername(token));
        assertTrue(jwtUtil.validarToken(token, "juliano@example.com"));
        assertFalse(jwtUtil.validarToken(token, "outro@example.com"));
    }

    @Test
    void rejeitaTokenExpirado() {
        JwtUtil jwtUtil = new JwtUtil(SECRET, -60_000);
        String token = jwtUtil.generateToken("juliano@example.com");

        assertThrows(JwtException.class, () -> jwtUtil.validarToken(token, "juliano@example.com"));
    }

    @Test
    void rejeitaTokenAssinadoComOutraChave() {
        String token = new JwtUtil(SECRET, 60_000).generateToken("juliano@example.com");
        JwtUtil outraChave = new JwtUtil("outra-chave-de-teste-com-mais-de-trinta-e-dois-bytes", 60_000);

        assertThrows(JwtException.class, () -> outraChave.validarToken(token, "juliano@example.com"));
    }
}
