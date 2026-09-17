package ifsc.edu.artigos;

import ifsc.edu.artigos.dtos.ArquivoMetadadoDTO;
import ifsc.edu.artigos.dtos.ArquivoRespostaDTO;
import ifsc.edu.artigos.repositories.ArquivoMetadadoRepository;
import ifsc.edu.artigos.services.ArquivoService;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.mock.web.MockMultipartFile;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArquivoServiceTest {

    @Mock
    private ArquivoMetadadoRepository repository;

    @Mock
    private GridFsTemplate gridFsTemplate; // Adicionada a simulação do GridFS (MongoDB)

    @InjectMocks
    private ArquivoService arquivoService;


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
        ArquivoRespostaDTO resposta = arquivoService.salvarArquivo(mockFile);

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
        Exception exception = assertThrows(IllegalArgumentException.class, () -> arquivoService.salvarArquivo(arquivoVazio));
        assertEquals("Arquivo não pode estar vazio", exception.getMessage());
        verify(gridFsTemplate, never()).store(any(), any(), any(), any());
    }


    //teste salvarMetadados

    @Test
    @DisplayName("Deve salvar metadados com sucesso")
    void salvarMetadadosComSucesso() {
        // Arrange
        ArquivoMetadadoDTO metadadoEntrada = new ArquivoMetadadoDTO();
        metadadoEntrada.setTitulo("Artigo Teste");

        ArquivoMetadadoDTO metadadoSalvo = new ArquivoMetadadoDTO();
        metadadoSalvo.setId("12345");
        metadadoSalvo.setTitulo("Artigo Teste");

        when(repository.save(any(ArquivoMetadadoDTO.class))).thenReturn(metadadoSalvo);

        // Act
        ArquivoMetadadoDTO resultado = arquivoService.salvarMetadados(metadadoEntrada);

        // Assert
        assertNotNull(resultado.getId());
        assertEquals("Artigo Teste", resultado.getTitulo());
        verify(repository, times(1)).save(any(ArquivoMetadadoDTO.class));
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar salvar metadados sem título")
    void salvarMetadadosSemTituloLancaExcecao() {
        // Arrange
        ArquivoMetadadoDTO metadadoInvalido = new ArquivoMetadadoDTO(); // Título nulo

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> arquivoService.salvarMetadados(metadadoInvalido));
        assertEquals("Nome do arquivo é obrigatório nos metadados", exception.getMessage());
        verify(repository, never()).save(any());
    }
}