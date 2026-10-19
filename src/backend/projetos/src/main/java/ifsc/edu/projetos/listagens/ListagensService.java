package ifsc.edu.projetos.listagens;

import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

@Service
public class ListagensService {

    private static final int TAMANHO_MAXIMO_PAGINA = 100;

    private final ProjetoRepository projetoRepository;
    private final MongoTemplate mongoTemplate;

    public ListagensService(ProjetoRepository projetoRepository, MongoTemplate mongoTemplate) {
        this.projetoRepository = projetoRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public Page<Projeto> listarTodos(int page, int size) {
        Pageable pageable = criarPaginacao(page, size);
        Query query = new Query();
        return buscarPagina(query, pageable);
    }

    public Optional<Projeto> buscarPorId(String id) {
        return projetoRepository.findById(id);
    }

    public Page<Projeto> listarPorTecnologias(List<String> tecnologias, int page, int size) {
        List<String> filtros = tecnologias.stream()
                .flatMap(tecnologia -> Arrays.stream(tecnologia.split(",")))
                .map(String::trim)
                .filter(tecnologia -> !tecnologia.isEmpty())
                .distinct()
                .toList();
        if (filtros.isEmpty()) {
            throw new IllegalArgumentException("Informe ao menos uma tecnologia");
        }

        Pageable pageable = criarPaginacao(page, size);
        Query query = Query.query(Criteria.where("tecnologias").in(filtros));
        return buscarPagina(query, pageable);
    }

    private Page<Projeto> buscarPagina(Query query, Pageable pageable) {
        long total = mongoTemplate.count(query, Projeto.class);
        List<Projeto> projetos = mongoTemplate.find(query.with(pageable), Projeto.class);
        return new PageImpl<>(projetos, pageable, total);
    }

    private Pageable criarPaginacao(int page, int size) {
        if (page < 0) {
            throw new IllegalArgumentException("O número da página não pode ser negativo");
        }
        if (size < 1 || size > TAMANHO_MAXIMO_PAGINA) {
            throw new IllegalArgumentException(
                    "O tamanho da página deve estar entre 1 e " + TAMANHO_MAXIMO_PAGINA);
        }
        return PageRequest.of(page, size);
    }
}
