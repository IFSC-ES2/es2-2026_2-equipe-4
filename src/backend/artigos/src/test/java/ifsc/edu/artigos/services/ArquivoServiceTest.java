package ifsc.edu.artigos.services;

import ifsc.edu.artigos.dtos.ArquivoMetadadoDTO;
import ifsc.edu.artigos.dtos.ArquivoRespostaDTO;
import ifsc.edu.artigos.repositories.ArquivoMetadadoRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArquivoServiceTest {

    @Mock
    private ArquivoMetadadoRepository repository;

    @InjectMocks
    private ArquivoService arquivoService;

    // Limpa a pasta de uploads criada durante os testes para evitar arquivos residuais
    @AfterEach
    void cleanUp() throws IOException {
        Path pastaUploads = Paths.get("uploads");
        if (Files.exists(pastaUploads)) {
            Files.walk(pastaUploads)
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        }
    }


    // Teste do salvarArquivo

    @Test
    @DisplayName("Deve salvar arquivo com sucesso quando receber um arquivo válido")
    void deveSalvarArquivoComSucesso() {
        // Arrange
        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo",
                "artigo.pdf",
                "application/pdf",
                "Conteúdo do artigo de teste".getBytes()
        );

        // Act
        ArquivoRespostaDTO resposta = arquivoService.salvarArquivo(arquivo);

        // Assert
        assertNotNull(resposta);
        assertNotNull(resposta.getId());
        assertEquals("artigo.pdf", resposta.getNomeOriginal());
        assertEquals("Arquivo salvo com sucesso", resposta.getMensagem());
        assertTrue(resposta.getTamanhoBytes() > 0);
        assertTrue(Files.exists(Paths.get(resposta.getCaminhoArmazenado())));
    }

    @Test
    @DisplayName("Deve lançar exceção quando o arquivo for nulo")
    void deveLancarExcecaoQuandoArquivoForNulo() {
        // Act & Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> arquivoService.salvarArquivo(null)
        );

        assertEquals("Arquivo não pode estar vazio", exception.getMessage());
    }

    @Test
    @DisplayName("Deve lançar exceção quando o arquivo estiver vazio")
    void deveLancarExcecaoQuandoArquivoEstiverVazio() {
        // Arrange
        MockMultipartFile arquivoVazio = new MockMultipartFile(
                "arquivo",
                "vazio.txt",
                "text/plain",
                new byte[0]
        );

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> arquivoService.salvarArquivo(arquivoVazio)
        );

        assertEquals("Arquivo não pode estar vazio", exception.getMessage());
    }


    //Teste do salvarMetadado

    @Test
    @DisplayName("Deve salvar metadados com sucesso quando o título for válido")
    void deveSalvarMetadadosComSucesso() {
        // Arrange
        ArquivoMetadadoDTO dto = new ArquivoMetadadoDTO();
        dto.setTitulo("Estudo sobre Spring Boot e CI/CD");
        dto.setResumo("Resumo do artigo");
        dto.setAutores(List.of("Autor 1"));

        ArquivoMetadadoDTO dtoSalvo = new ArquivoMetadadoDTO();
        dtoSalvo.setId("12345");
        dtoSalvo.setTitulo(dto.getTitulo());

        when(repository.save(any(ArquivoMetadadoDTO.class))).thenReturn(dtoSalvo);

        // Act
        ArquivoMetadadoDTO resultado = arquivoService.salvarMetadados(dto);

        // Assert
        assertNotNull(resultado);
        assertEquals("12345", resultado.getId());
        assertEquals("Estudo sobre Spring Boot e CI/CD", resultado.getTitulo());
        verify(repository, times(1)).save(dto);
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar salvar metadados com título nulo ou em branco")
    void deveLancarExcecaoQuandoTituloForInvalido() {
        // Arrange
        ArquivoMetadadoDTO dtoComTituloEmBranco = new ArquivoMetadadoDTO();
        dtoComTituloEmBranco.setTitulo("   ");

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> arquivoService.salvarMetadados(dtoComTituloEmBranco)
        );

        assertEquals("Nome do arquivo é obrigatório nos metadados", exception.getMessage());
        verify(repository, never()).save(any());
    }
}