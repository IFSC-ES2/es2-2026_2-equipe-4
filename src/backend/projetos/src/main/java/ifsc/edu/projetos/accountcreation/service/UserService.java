package ifsc.edu.projetos.accountcreation.service;

import ifsc.edu.projetos.accountcreation.dtos.CreateUserRequest;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.accountcreation.entity.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired 
    public UserService(UserRepository usuarioRepository, PasswordEncoder passwordEncoder){
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> createUser(CreateUserRequest dataForCreatingAnAccountUserRequestDTO) {
        String email = normalizarEmail(dataForCreatingAnAccountUserRequestDTO.getEmail());
        if (usuarioRepository.existsByEmail(email)) {
            return Optional.empty();
        }

        User newUser = new User();
        String getPasswordEncode = passwordEncoder.encode(dataForCreatingAnAccountUserRequestDTO.getPassword());

        newUser.setNome(dataForCreatingAnAccountUserRequestDTO.getNome());
        newUser.setEmail(email);
        newUser.setPassword(getPasswordEncode);

        return Optional.of(usuarioRepository.save(newUser));
    }

    public Optional<User> updateUser(CreateUserRequest dataForUpdateUserRequestDTO) {
        return usuarioRepository.findByEmail(normalizarEmail(dataForUpdateUserRequestDTO.getEmail()))
                .map(user -> {
                    if (dataForUpdateUserRequestDTO.getNome() != null) {
                        user.setNome(dataForUpdateUserRequestDTO.getNome());
                    }
                    if (dataForUpdateUserRequestDTO.getPassword() != null) {
                        user.setPassword(passwordEncoder.encode(dataForUpdateUserRequestDTO.getPassword()));
                    }
                    return usuarioRepository.save(user);
                });
    }

    private String normalizarEmail(String email) {
        return email.trim().toLowerCase(java.util.Locale.ROOT);
    }

    public boolean deleteUser(String userIdByPathVariable){
        if (usuarioRepository.existsById(userIdByPathVariable)) {
            usuarioRepository.deleteById(userIdByPathVariable);
            return true;
        }
        return false;
    }
}
