package ifsc.edu.projetos;

import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.controllers.ProjetoController;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import ifsc.edu.projetos.services.ArmazenamentoArquivoService;
import ifsc.edu.projetos.services.ProjetoService;
import jakarta.servlet.ServletException;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ProjetoUploadControllerTest {

    @Mock
    private GridFsTemplate gridFsTemplate;
    @Mock
    private ProjetoRepository repository;
    @Mock
    private UserRepository userRepository;

    private MockMvc mvc;

    @BeforeEach
    void configurar() {
        ProjetoService projetos = new ProjetoService(repository,
                new ArmazenamentoArquivoService(gridFsTemplate), userRepository);
        mvc = MockMvcBuilders.standaloneSetup(new ProjetoController(projetos)).build();
    }

    @Test
    void uploadValidoMantemStatus201ECamposDaResposta() throws Exception {
        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "imagem.png", "image/png", new byte[]{1, 2, 3});
        ObjectId id = new ObjectId();
        when(gridFsTemplate.store(any(InputStream.class), eq("imagem.png"),
                eq("image/png"), any(Document.class))).thenReturn(id);

        mvc.perform(multipart("/projetos/upload").file(arquivo))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id.toHexString()))
                .andExpect(jsonPath("$.nomeOriginal").value("imagem.png"))
                .andExpect(jsonPath("$.caminhoArmazenado").value(id.toHexString()))
                .andExpect(jsonPath("$.tamanhoBytes").value(3))
                .andExpect(jsonPath("$.mensagem").value("Arquivo salvo com sucesso"));
    }

    @Test
    void uploadVazioMantemStatus400EMensagem() throws Exception {
        MockMultipartFile arquivo = new MockMultipartFile("arquivo", new byte[0]);

        mvc.perform(multipart("/projetos/upload").file(arquivo))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.erro").value("Arquivo não pode estar vazio"));

        verifyNoInteractions(gridFsTemplate);
    }

    @Test
    void falhaDoBancoContinuaPropagadaPeloController() {
        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "imagem.png", "image/png", new byte[]{1});
        DataAccessResourceFailureException falha =
                new DataAccessResourceFailureException("armazenamento indisponível");
        when(gridFsTemplate.store(any(InputStream.class), anyString(),
                anyString(), any(Document.class))).thenThrow(falha);

        ServletException erro = assertThrows(ServletException.class,
                () -> mvc.perform(multipart("/projetos/upload").file(arquivo)));
        assertSame(falha, erro.getCause());
    }
}
