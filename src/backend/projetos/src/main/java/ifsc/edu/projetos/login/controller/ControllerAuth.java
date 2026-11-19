package ifsc.edu.projetos.login.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ifsc.edu.projetos.login.dtos.AuthUserRequestDTO;
import ifsc.edu.projetos.login.dtos.AuthUserResponseDTO;
import ifsc.edu.projetos.login.service.AuthService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class ControllerAuth {

    private final AuthService authService;

    @Autowired
    public ControllerAuth(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/status")
    public ResponseEntity<java.util.Map<String, String>> status() {
        return ResponseEntity.ok(java.util.Map.of("mensagem", "Serviço de autenticação disponível"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthUserResponseDTO> routeForLoginOfUser(@Valid @RequestBody AuthUserRequestDTO dataRequestOfuserDTO) {
        String token = authService.login(dataRequestOfuserDTO.getEmail(), dataRequestOfuserDTO.getPassword());
        AuthUserResponseDTO responseWithTokenForUser = new AuthUserResponseDTO(token);
        return ResponseEntity.ok(responseWithTokenForUser);
    }

    @GetMapping("/token")
    public ResponseEntity<Map<String, String>> routeForTestIfTokenIsvalid(Authentication authentication) {
        String userId = authService.buscarIdUsuario(authentication.getName());
        return ResponseEntity.ok(Map.of("mensagem", "Token válido", "userId", userId));
    }
}
