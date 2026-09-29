package ifsc.edu.artigos.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ifsc.edu.artigos.login.dtos.AuthUserRequestDTO;
import ifsc.edu.artigos.login.dtos.AuthUserResponseDTO;
import ifsc.edu.artigos.login.service.AuthService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class ControllerAuth {

    private final AuthService authService;

    @Autowired
    public ControllerAuth(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/")
    public String routeForTestRunningAPIWithSimpleMessage() {
        return "{\"Status\":\"Api running successfully\", \"Test\":\"My applications is runing with devoolss\"}";
    }

    @PostMapping("/login")
    public ResponseEntity<AuthUserResponseDTO> routeForLoginOfUser(@Valid @RequestBody AuthUserRequestDTO dataRequestOfuserDTO) {
        String token = authService.login(dataRequestOfuserDTO.getEmail(), dataRequestOfuserDTO.getPassword());
        AuthUserResponseDTO responseWithTokenForUser = new AuthUserResponseDTO(token);
        return ResponseEntity.ok(responseWithTokenForUser);
    }

    @GetMapping("/token")
    public ResponseEntity<String> routeForTestIfTokenIsvalid() {
        String responseIfTokenIsValid = "{\"Status\":\"Token is Valid\"}";
        return ResponseEntity
                .status(200)
                .header("Content-Type", "application/json")
                .body(responseIfTokenIsValid);
    }
}
