package ifsc.edu.artigos.login.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AuthUserRequestDTO {

    @NotNull(message = "Email is required")
    @Email(message = "invalid email")
    private String email;

    @NotNull(message = "The name can't be empty")
    @Size(min = 6, max = 50, message = "The password must be between 6 and 50 characters long")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
