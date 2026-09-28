package ifsc.edu.artigos.accountcreation.service;

import ifsc.edu.artigos.accountcreation.dtos.CreateUserRequest;
import ifsc.edu.artigos.accountcreation.repository.UserRepository;
import ifsc.edu.artigos.accountcreation.entity.User;

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
        if (usuarioRepository.existsByEmail(dataForCreatingAnAccountUserRequestDTO.getEmail())) {
            return Optional.empty();
        }

        User newUser = new User();
        String getPasswordEncode = passwordEncoder.encode(dataForCreatingAnAccountUserRequestDTO.getPassword());

        newUser.setNome(dataForCreatingAnAccountUserRequestDTO.getNome());
        newUser.setEmail(dataForCreatingAnAccountUserRequestDTO.getEmail());
        newUser.setPassword(getPasswordEncode);

        return Optional.of(usuarioRepository.save(newUser));
    }

    public Optional<User> updateUser(CreateUserRequest dataForUpdateUserRequestDTO) {
        return usuarioRepository.findByEmail(dataForUpdateUserRequestDTO.getEmail())
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

    public boolean deleteUser(String userIdByPathVariable){
        if (usuarioRepository.existsById(userIdByPathVariable)) {
            usuarioRepository.deleteById(userIdByPathVariable);
            return true;
        }
        return false;
    }
}
