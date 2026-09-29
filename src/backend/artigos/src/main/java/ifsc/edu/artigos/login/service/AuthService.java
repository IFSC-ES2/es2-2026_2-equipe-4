package ifsc.edu.artigos.login.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ifsc.edu.artigos.accountcreation.entity.User;
import ifsc.edu.artigos.accountcreation.repository.UserRepository;
import ifsc.edu.artigos.login.security.JwtUtil;
import ifsc.edu.artigos.login.exceptions.AuthException;

@Service
public class AuthService {

    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String email, String password) {
        User usuario = usuarioRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new AuthException("E-mail ou senha incorretos"));
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new AuthException("E-mail ou senha incorretos");
        }

        return jwtUtil.generateToken(usuario.getEmail());
    }
}
