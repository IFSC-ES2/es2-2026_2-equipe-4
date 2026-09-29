package ifsc.edu.artigos.login.dtos;

public class AuthUserResponseDTO {

    private String token;

    public AuthUserResponseDTO() {
    }

    public AuthUserResponseDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}