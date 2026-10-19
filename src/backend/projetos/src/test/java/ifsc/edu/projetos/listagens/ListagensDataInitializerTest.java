package ifsc.edu.projetos.listagens;

import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.DefaultApplicationArguments;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ListagensDataInitializerTest {

    private final ProjetoRepository projetoRepository = mock(ProjetoRepository.class);
    private final ListagensDataInitializer initializer = new ListagensDataInitializer(projetoRepository);

    @Test
    void insereTrintaProjetosQuandoBancoEstaVazio() {
        when(projetoRepository.count()).thenReturn(0L);

        initializer.run(new DefaultApplicationArguments(new String[0]));

        verify(projetoRepository).saveAll(argThat(projetos -> {
            List<Projeto> lista = new ArrayList<>();
            projetos.forEach(lista::add);
            return lista.size() == 30;
        }));
    }

    @Test
    void naoInsereProjetosQuandoBancoJaPossuiDados() {
        when(projetoRepository.count()).thenReturn(1L);

        initializer.run(new DefaultApplicationArguments(new String[0]));

        verify(projetoRepository, never()).saveAll(anyList());
    }
}
