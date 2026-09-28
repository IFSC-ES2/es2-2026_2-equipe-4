package ifsc.edu.artigos.accountcreation.service;

import ifsc.edu.artigos.accountcreation.dtos.CreateUserRequest;
import ifsc.edu.artigos.accountcreation.repository.UserRepository;
import ifsc.edu.artigos.accountcreation.entity.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired 
    public UserService(UserRepository usuarioRepository, PasswordEncoder passwordEncoder){
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String createUser(CreateUserRequest dataForCreatingAnAccountUserRequestDTO) {
        User newUser = new User();
        String getPasswordEncode = passwordEncoder.encode(dataForCreatingAnAccountUserRequestDTO.getPassword());

        newUser.setNome(dataForCreatingAnAccountUserRequestDTO.getNome());
        newUser.setEmail(dataForCreatingAnAccountUserRequestDTO.getEmail());
        newUser.setPassword(getPasswordEncode);

        boolean existEmailOfUser = usuarioRepository.existsByEmail(newUser.getEmail());
        if(existEmailOfUser){
            return "O email informado já está em uso";
        }

        if (dataForCreatingAnAccountUserRequestDTO.getNome() == null || dataForCreatingAnAccountUserRequestDTO.getEmail() == null || dataForCreatingAnAccountUserRequestDTO.getPassword() == null ||
            dataForCreatingAnAccountUserRequestDTO.getNome().isEmpty() || dataForCreatingAnAccountUserRequestDTO.getEmail().isEmpty() || dataForCreatingAnAccountUserRequestDTO.getPassword().isEmpty()) {
            return "Erro na criação do usuário: dados inválidos";
        }
        usuarioRepository.save(newUser);
        return "Usuário criado com sucesso";
    }

    public String updatUser(CreateUserRequest dataForUpdateUserRequestDTO) {
        String userId = usuarioRepository.findByEmail(dataForUpdateUserRequestDTO.getEmail())
                .map(User::getId)
                .orElse(null);  

        String getPasswordEncode = dataForUpdateUserRequestDTO.getPassword() != null
                ? passwordEncoder.encode(dataForUpdateUserRequestDTO.getPassword())
                : null;

        return usuarioRepository.findById(userId)
            .map(user -> {
                if (dataForUpdateUserRequestDTO.getNome() != null) {
                    user.setNome(dataForUpdateUserRequestDTO.getNome());
                }
                if (getPasswordEncode != null) {
                    user.setPassword(getPasswordEncode);
                }
                if (dataForUpdateUserRequestDTO.getEmail() != null) {
                    user.setEmail(dataForUpdateUserRequestDTO.getEmail());
                }

                usuarioRepository.save(user);
                return "Informações atualizadas com sucesso";
            })
            .orElse("Erro na atualização: usuário não encontrado");
    }
    
    public final String deleteUser(String userIdByPathVariable){
        if(usuarioRepository.existsById(userIdByPathVariable)){
            usuarioRepository.deleteById(userIdByPathVariable);
            return "Conta excluída com sucesso";
        }
        return "Erro ao excluir a conta";
    }
}
