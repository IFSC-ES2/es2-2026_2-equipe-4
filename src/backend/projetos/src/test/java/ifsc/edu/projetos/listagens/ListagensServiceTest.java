package ifsc.edu.projetos.listagens;

import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListagensServiceTest {

    @Mock
    private ProjetoRepository projetoRepository;

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private ListagensService listagensService;

    @Test
    void listaProjetosPorTecnologiasComPaginacao() {
        when(mongoTemplate.count(any(Query.class), eq(Projeto.class))).thenReturn(3L);
        when(mongoTemplate.find(any(Query.class), eq(Projeto.class))).thenReturn(List.of());

        Page<Projeto> resultado = listagensService.listarPorTecnologias(
                List.of("Java, React", "Java"), 1, 2);

        assertEquals(3, resultado.getTotalElements());
        assertEquals(1, resultado.getNumber());
        assertEquals(2, resultado.getSize());

        ArgumentCaptor<Query> queryCaptor = ArgumentCaptor.forClass(Query.class);
        verify(mongoTemplate).count(queryCaptor.capture(), eq(Projeto.class));
        Document filtroTecnologias = (Document) queryCaptor.getValue()
                .getQueryObject().get("tecnologias");
        assertEquals(List.of("Java", "React"), filtroTecnologias.getList("$in", String.class));

        verify(mongoTemplate).find(queryCaptor.capture(), eq(Projeto.class));
        assertEquals(2, queryCaptor.getValue().getSkip());
        assertEquals(2, queryCaptor.getValue().getLimit());
    }

    @Test
    void rejeitaPaginacaoInvalida() {
        assertThrows(IllegalArgumentException.class, () -> listagensService.listarTodos(0, 101));
    }

    @Test
    void rejeitaFiltroSemTecnologias() {
        assertThrows(IllegalArgumentException.class,
                () -> listagensService.listarPorTecnologias(List.of(" , "), 0, 20));
    }
}
