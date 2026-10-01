package ifsc.edu.projetos.repositories;

import ifsc.edu.projetos.dtos.Projeto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjetoRepository extends MongoRepository<Projeto, String> {
}
