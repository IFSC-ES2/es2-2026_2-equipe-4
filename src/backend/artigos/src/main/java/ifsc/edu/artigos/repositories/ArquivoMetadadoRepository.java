package ifsc.edu.artigos.repositories;

import ifsc.edu.artigos.dtos.ArquivoMetadadoDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArquivoMetadadoRepository extends MongoRepository<ArquivoMetadadoDTO, String> {
}
