package ifsc.edu.projetos.login.service;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.login.exceptions.AuthException;
import ifsc.edu.projetos.login.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void autenticaEmailNormalizadoEGeraToken() {
        User usuario = usuario();
        when(userRepository.findByEmail("juliano@example.com")).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches("senha123", "hash-da-senha")).thenReturn(true);
        when(jwtUtil.generateToken("juliano@example.com")).thenReturn("token-valido");

        assertEquals("token-valido", authService.login(" JULIANO@EXAMPLE.COM ", "senha123"));

        verify(jwtUtil).generateToken("juliano@example.com");
    }

    @Test
    void rejeitaEmailNaoCadastradoSemGerarToken() {
        when(userRepository.findByEmail("ausente@example.com")).thenReturn(Optional.empty());

        AuthException erro = assertThrows(AuthException.class,
                () -> authService.login("ausente@example.com", "senha123"));

        assertEquals("E-mail ou senha incorretos", erro.getMessage());
        verify(jwtUtil, never()).generateToken(org.mockito.ArgumentMatchers.any());
    }

    @Test
    void rejeitaSenhaIncorretaSemGerarToken() {
        when(userRepository.findByEmail("juliano@example.com")).thenReturn(Optional.of(usuario()));
        when(passwordEncoder.matches("senha-errada", "hash-da-senha")).thenReturn(false);

        AuthException erro = assertThrows(AuthException.class,
                () -> authService.login("juliano@example.com", "senha-errada"));

        assertEquals("E-mail ou senha incorretos", erro.getMessage());
        verify(jwtUtil, never()).generateToken(org.mockito.ArgumentMatchers.any());
    }

    private User usuario() {
        User usuario = new User();
        usuario.setEmail("juliano@example.com");
        usuario.setPassword("hash-da-senha");
        return usuario;
    }
}
