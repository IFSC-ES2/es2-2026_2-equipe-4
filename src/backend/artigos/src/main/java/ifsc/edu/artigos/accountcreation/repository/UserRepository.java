package ifsc.edu.artigos.accountcreation.repository;

import ifsc.edu.artigos.accountcreation.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // existsById e deleteById já vêm prontos no MongoRepository,
    // não precisa redeclarar

    // Busca só o _id, sem carregar o documento inteiro
    @Query(value = "{ 'email': ?0 }", fields = "{ '_id': 1 }")
    Optional<User> findIdByEmail(String email);


}