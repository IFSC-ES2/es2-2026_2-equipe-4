package ifsc.edu.projetos.accountcreation.service;

import ifsc.edu.projetos.accountcreation.dtos.CreateUserRequest;
import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void criaUsuarioComEmailNormalizadoESenhaCodificada() {
        CreateUserRequest request = new CreateUserRequest(" JULIANO@EXAMPLE.COM ", "Juliano", "senha123");
        when(passwordEncoder.encode("senha123")).thenReturn("hash-da-senha");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Optional<User> resultado = userService.createUser(request);

        assertTrue(resultado.isPresent());
        ArgumentCaptor<User> usuarioSalvo = ArgumentCaptor.forClass(User.class);
        verify(userRepository).existsByEmail("juliano@example.com");
        verify(userRepository).save(usuarioSalvo.capture());
        assertEquals("juliano@example.com", usuarioSalvo.getValue().getEmail());
        assertEquals("Juliano", usuarioSalvo.getValue().getNome());
        assertEquals("hash-da-senha", usuarioSalvo.getValue().getPassword());
    }

    @Test
    void naoCriaUsuarioComEmailJaCadastrado() {
        CreateUserRequest request = new CreateUserRequest(" JULIANO@EXAMPLE.COM ", "Juliano", "senha123");
        when(userRepository.existsByEmail("juliano@example.com")).thenReturn(true);

        assertTrue(userService.createUser(request).isEmpty());

        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(any());
    }
}
