package ifsc.edu.projetos.repositories;

import ifsc.edu.projetos.dtos.Projeto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;

public interface ProjetoRepository extends MongoRepository<Projeto, String> {
    long deleteByIdAndAutorId(String id, String autorId);

    @Query("{ '_id': ?0, 'autorId': ?1 }")
    @Update("{ '$set': { 'imagens': ?2 } }")
    long atualizarImagens(String id, String autorId, List<String> imagens);
}
