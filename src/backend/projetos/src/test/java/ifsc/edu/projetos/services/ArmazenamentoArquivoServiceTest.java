package ifsc.edu.projetos.services;

import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArmazenamentoArquivoServiceTest {

    @Mock
    private GridFsTemplate gridFsTemplate;

    @InjectMocks
    private ArmazenamentoArquivoService armazenamento;

    @Test
    void salvaConteudoMetadadosERetornaRespostaOriginal() throws Exception {
        byte[] conteudo = "imagem de teste".getBytes(StandardCharsets.UTF_8);
        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "imagem.png", "image/png", conteudo);
        ObjectId id = new ObjectId();
        when(gridFsTemplate.store(any(InputStream.class), eq("imagem.png"),
                eq("image/png"), any(Document.class))).thenReturn(id);

        ProjetoRespostaDTO resposta = armazenamento.salvarArquivo(arquivo);

        assertEquals(id.toHexString(), resposta.getId());
        assertEquals(id.toHexString(), resposta.getCaminhoArmazenado());
        assertEquals("imagem.png", resposta.getNomeOriginal());
        assertEquals(conteudo.length, resposta.getTamanhoBytes());
        assertEquals("Arquivo salvo com sucesso", resposta.getMensagem());

        ArgumentCaptor<InputStream> stream = ArgumentCaptor.forClass(InputStream.class);
        ArgumentCaptor<Document> metadata = ArgumentCaptor.forClass(Document.class);
        verify(gridFsTemplate).store(stream.capture(), eq("imagem.png"),
                eq("image/png"), metadata.capture());
        assertArrayEquals(conteudo, stream.getValue().readAllBytes());
        assertEquals("image/png", metadata.getValue().getString("contentType"));
        assertEquals((long) conteudo.length, metadata.getValue().getLong("size"));
    }

    @Test
    void rejeitaArquivoVazioSemGravar() {
        MockMultipartFile arquivo = new MockMultipartFile("arquivo", new byte[0]);

        IllegalArgumentException erro = assertThrows(IllegalArgumentException.class,
                () -> armazenamento.salvarArquivo(arquivo));

        assertEquals("Arquivo não pode estar vazio", erro.getMessage());
        verifyNoInteractions(gridFsTemplate);
    }

    @Test
    void rejeitaArquivoNuloSemGravar() {
        IllegalArgumentException erro = assertThrows(IllegalArgumentException.class,
                () -> armazenamento.salvarArquivo(null));

        assertEquals("Arquivo não pode estar vazio", erro.getMessage());
        verifyNoInteractions(gridFsTemplate);
    }

    @Test
    void mantemMensagemECausaDaFalhaDeLeitura() throws Exception {
        MultipartFile arquivo = mock(MultipartFile.class);
        IOException falha = new IOException("leitura interrompida");
        when(arquivo.getInputStream()).thenThrow(falha);

        RuntimeException erro = assertThrows(RuntimeException.class,
                () -> armazenamento.salvarArquivo(arquivo));

        assertEquals("Erro ao salvar arquivo: leitura interrompida", erro.getMessage());
        assertSame(falha, erro.getCause());
        verifyNoInteractions(gridFsTemplate);
    }

    @Test
    void propagaFalhaDoBancoSemAlterarAExcecao() {
        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "imagem.png", "image/png", new byte[]{1});
        DataAccessResourceFailureException falha =
                new DataAccessResourceFailureException("armazenamento indisponível");
        when(gridFsTemplate.store(any(InputStream.class), anyString(),
                anyString(), any(Document.class))).thenThrow(falha);

        assertSame(falha, assertThrows(DataAccessResourceFailureException.class,
                () -> armazenamento.salvarArquivo(arquivo)));
    }
}
