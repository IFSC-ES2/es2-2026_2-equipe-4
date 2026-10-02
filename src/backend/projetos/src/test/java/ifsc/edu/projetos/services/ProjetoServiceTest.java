package ifsc.edu.projetos.services;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.mock.web.MockMultipartFile;

import java.io.InputStream;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjetoServiceTest {

    @Mock
    private ProjetoRepository repository;

    @Mock
    private GridFsTemplate gridFsTemplate; // Adicionada a simulação do GridFS (MongoDB)

    @Mock
    private UserRepository userRepository; // Simula a busca do id do usuário logado pelo e-mail

    @InjectMocks
    private ProjetoService projetoService;


    // testes salvarArquivo

    @Test
    @DisplayName("Deve salvar arquivo no GridFS com sucesso e retornar DTO")
    void salvarArquivoComSucesso() throws Exception {
        // Arrange
        MockMultipartFile mockFile = new MockMultipartFile(
                "file",
                "documento.pdf",
                "application/pdf",
                "conteudo fake".getBytes()
        );

        ObjectId mockId = new ObjectId();

        // Simula o comportamento do GridFS retornando um ObjectId
        when(gridFsTemplate.store(any(InputStream.class), eq("documento.pdf"), eq("application/pdf"), any(Document.class)))
                .thenReturn(mockId);

        // Act
        ProjetoRespostaDTO resposta = projetoService.salvarArquivo(mockFile);

        // Assert
        assertNotNull(resposta);
        assertEquals("documento.pdf", resposta.getNomeOriginal());
        assertEquals(mockId.toHexString(), resposta.getId());
        verify(gridFsTemplate, times(1)).store(any(), any(), any(), any());
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar salvar arquivo vazio ou nulo")
    void salvarArquivoVazioLancaExcecao() {
        // Arrange
        MockMultipartFile arquivoVazio = new MockMultipartFile("file", new byte[0]);

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> projetoService.salvarArquivo(arquivoVazio));
        assertEquals("Arquivo não pode estar vazio", exception.getMessage());
        verify(gridFsTemplate, never()).store(any(), any(), any(), any());
    }


    //teste salvarMetadados

    @Test
    @DisplayName("Deve salvar metadados com sucesso")
    void salvarMetadadosComSucesso() {
        // Arrange
        Projeto metadadoEntrada = new Projeto();
        metadadoEntrada.setTitulo("Artigo Teste");
        metadadoEntrada.setId("id-enviado-pelo-cliente");
        metadadoEntrada.setAutorId("outro-autor");

        Projeto metadadoSalvo = new Projeto();
        metadadoSalvo.setId("12345");
        metadadoSalvo.setTitulo("Artigo Teste");
        metadadoSalvo.setAutorId("u1");

        User autor = new User();
        autor.setId("u1");
        when(userRepository.findIdByEmail("a@a.com")).thenReturn(Optional.of(autor));
        when(repository.save(any(Projeto.class))).thenReturn(metadadoSalvo);

        // Act
        Projeto resultado = projetoService.salvarMetadados(metadadoEntrada, "a@a.com");

        // Assert
        assertNotNull(resultado.getId());
        assertEquals("Artigo Teste", resultado.getTitulo());
        ArgumentCaptor<Projeto> projetoEnviadoAoBanco = ArgumentCaptor.forClass(Projeto.class);
        verify(userRepository).findIdByEmail("a@a.com");
        verify(repository).save(projetoEnviadoAoBanco.capture());
        assertNull(projetoEnviadoAoBanco.getValue().getId());
        assertEquals("u1", projetoEnviadoAoBanco.getValue().getAutorId());
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar salvar metadados sem título")
    void salvarMetadadosSemTituloLancaExcecao() {
        // Arrange
        Projeto metadadoInvalido = new Projeto(); // Título nulo

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> projetoService.salvarMetadados(metadadoInvalido, "a@a.com"));
        assertEquals("Nome do arquivo é obrigatório nos metadados", exception.getMessage());
        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Não deve salvar projeto quando o usuário do token não existe")
    void salvarMetadadosSemUsuarioLancaExcecao() {
        Projeto metadadoEntrada = new Projeto();
        metadadoEntrada.setTitulo("Projeto Teste");
        when(userRepository.findIdByEmail("ausente@exemplo.com")).thenReturn(Optional.empty());

        IllegalArgumentException erro = assertThrows(IllegalArgumentException.class,
                () -> projetoService.salvarMetadados(metadadoEntrada, "ausente@exemplo.com"));

        assertEquals("Usuário autor não encontrado", erro.getMessage());
        verify(repository, never()).save(any(Projeto.class));
    }
}
