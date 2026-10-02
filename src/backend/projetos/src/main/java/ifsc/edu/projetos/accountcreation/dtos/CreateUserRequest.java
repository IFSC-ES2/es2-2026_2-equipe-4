package ifsc.edu.projetos.accountcreation.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateUserRequest {
    
        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "Informe um e-mail válido")
        String email;

        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
        String nome;

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, max = 50, message = "A senha deve ter entre 6 e 50 caracteres")
        String password;
}
