package ifsc.edu.artigos.accountcreation.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.ResponseEntity;

import ifsc.edu.artigos.accountcreation.service.UserService;
import ifsc.edu.artigos.accountcreation.dtos.CreateUserRequest;
import ifsc.edu.artigos.accountcreation.dtos.UserSummaryResponse;
import ifsc.edu.artigos.accountcreation.entity.User;

import java.util.Optional;


// 8080/api/v1/users/createAccount/0.0.1
// curl -X GET http://localhost:8080/api/v1/users/createAccount/run
@RestController
@RequestMapping("${app.api.users.base}${app.api.users.create-account}/${app.api.version}")
public class AccountController {

    @Autowired
    private UserService userService;

    @Value("${app.api.users.base}${app.api.users.create-account}/${app.api.version}")
    private String path;

    @GetMapping("/run")
    public final String testeRun(){
        String statusResponse = "{\"Status\":\"Api running successfully\", \"Test\":\"My applications is runing with devoolss\"}";
        return statusResponse;
    }

    @PostMapping("/novousers")
    public final ResponseEntity<UserSummaryResponse> createAccount(@RequestBody @Valid CreateUserRequest userRequestDTO){

        Optional<User> createdUser = userService.createUser(userRequestDTO);
        int statusResponse = createdUser.isPresent() ? 200 : 409;
        String message = createdUser.isPresent()
                ? "Usuário criado com sucesso"
                : "O email informado já está em uso";
        String userId = createdUser.map(User::getId).orElse(null);
        UserSummaryResponse UserResponseDTO = new UserSummaryResponse(statusResponse, message, path, userId);
        return ResponseEntity
                .status(statusResponse)
                .header("Content-Type","application/json")
                .body(UserResponseDTO);
    }

    @PostMapping("/atualizar")
    public final ResponseEntity<UserSummaryResponse> updateUser(@RequestBody @Valid CreateUserRequest UserRequestDTO){

        Optional<User> updatedUser = userService.updateUser(UserRequestDTO);
        int statusResponse = updatedUser.isPresent() ? 200 : 404;
        String message = updatedUser.isPresent()
                ? "Informações atualizadas com sucesso"
                : "Usuário não encontrado";
        UserSummaryResponse UserResponseDTO = new UserSummaryResponse(statusResponse, message, path,
                updatedUser.map(User::getId).orElse(null));

        return ResponseEntity
                .status(statusResponse)
                .header("Content-Type", "application/json")
                .body(UserResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public final ResponseEntity<?> deleteUser(@PathVariable("id") String userId){

        if (userService.deleteUser(userId)) {
            return ResponseEntity.noContent().build();
        }
        UserSummaryResponse response = new UserSummaryResponse(404, "Usuário não encontrado", path, null);
        return ResponseEntity.status(404).body(response);
    }
}
