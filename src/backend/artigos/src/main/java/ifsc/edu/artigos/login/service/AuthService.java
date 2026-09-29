package ifsc.edu.artigos.login.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ifsc.edu.artigos.accountcreation.entity.User;
import ifsc.edu.artigos.accountcreation.repository.UserRepository;
import ifsc.edu.artigos.login.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String email, String password) {
        Optional<User> usuarioOptional = usuarioRepository.findByEmail(email);

        if (usuarioOptional.isEmpty()) {
            throw new RuntimeException("user not found");
        }

        User usuario = usuarioOptional.get();

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("invalid password");
        }

        return jwtUtil.generateToken(usuario.getEmail());
    }
}
