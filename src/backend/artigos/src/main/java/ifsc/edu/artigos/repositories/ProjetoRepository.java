package ifsc.edu.artigos.repositories;

import ifsc.edu.artigos.dtos.Projeto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjetoRepository extends MongoRepository<Projeto, String> {
}
