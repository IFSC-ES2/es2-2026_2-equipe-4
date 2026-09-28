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


// 8080/api/v1/users/createAccount/0.0.1
@RestController
//@RequestMapping("/criacao-conta")
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
        
        String response = userService.createUser(userRequestDTO);
        int statusResponse = 409;
        if(response.equals("User created successful")){
            statusResponse = 200;
        }

        UserSummaryResponse UserResponseDTO = new UserSummaryResponse(statusResponse, response, path);
        return ResponseEntity
                .status(statusResponse)
                .header("Content-Type","application/json")
                .body(UserResponseDTO);
    }

    @PostMapping("/atualizar")
    public final ResponseEntity<UserSummaryResponse> updateUser(@RequestBody CreateUserRequest UserRequestDTO){

        String responseUserService = userService.updatUser(UserRequestDTO);
        UserSummaryResponse UserResponseDTO = new UserSummaryResponse(201, responseUserService, path);

        return ResponseEntity
                .status(201)
                .header("Content-Type", "application/json")
                .body(UserResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    public final ResponseEntity<UserSummaryResponse> deleteUser(@PathVariable("id") String UserId){

        String responseUserService = userService.deleteUser(UserId);
        int statusResponse = 404;

        if(responseUserService.equals("account deleted sucessfully")){
            statusResponse = 204;    
        }
        UserSummaryResponse responseUserDeleteById = new UserSummaryResponse(statusResponse, responseUserService, path);

        return ResponseEntity
                .status(200)
                .header("Content-Type", "application/json")
                .body(responseUserDeleteById);
    }
}
