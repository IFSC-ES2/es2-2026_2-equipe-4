package ifsc.edu.projetos.services;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjetoServiceTest {

    @Mock
    private ProjetoRepository repository;

    @Mock
    private ArmazenamentoArquivoService armazenamentoArquivoService;

    @Mock
    private UserRepository userRepository; // Simula a busca do id do usuário logado pelo e-mail

    @InjectMocks
    private ProjetoService projetoService;


    @Test
    @DisplayName("Mantém a resposta do serviço de armazenamento")
    void salvarArquivoMantemResposta() {
        MockMultipartFile arquivo = new MockMultipartFile("arquivo", new byte[]{1});
        ProjetoRespostaDTO resposta = new ProjetoRespostaDTO(
                "id", "imagem.png", "id", 1, "Arquivo salvo com sucesso");
        when(armazenamentoArquivoService.salvarArquivo(arquivo)).thenReturn(resposta);

        assertSame(resposta, projetoService.salvarArquivo(arquivo));
        verify(armazenamentoArquivoService).salvarArquivo(arquivo);
        verifyNoInteractions(repository, userRepository);
    }

    @Test
    @DisplayName("Mantém a validação recebida do armazenamento")
    void salvarArquivoMantemErro() {
        MockMultipartFile arquivo = new MockMultipartFile("arquivo", new byte[0]);
        IllegalArgumentException falha = new IllegalArgumentException("Arquivo não pode estar vazio");
        when(armazenamentoArquivoService.salvarArquivo(arquivo)).thenThrow(falha);

        assertSame(falha, assertThrows(IllegalArgumentException.class,
                () -> projetoService.salvarArquivo(arquivo)));
        verifyNoInteractions(repository, userRepository);
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

    @Test
    @DisplayName("Usa uma imagem padrão quando a lista de imagens é nula ou vazia")
    void salvarMetadadosSemImagensUsaImagemPadrao() {
        // Preparar
        Projeto projetoSemLista = new Projeto();
        projetoSemLista.setTitulo("Projeto sem lista de imagens");

        Projeto projetoComListaVazia = new Projeto();
        projetoComListaVazia.setTitulo("Projeto com lista de imagens vazia");
        projetoComListaVazia.setImagens(List.of());

        User autor = new User();
        autor.setId("autor-1");
        when(userRepository.findIdByEmail("ana@exemplo.com")).thenReturn(Optional.of(autor));

        List<String> imagensPadrao = List.of(
                "/imagens-padrao/fundo-projeto-padrao-1.jpg",
                "/imagens-padrao/fundo-projeto-padrao-2.jpg",
                "/imagens-padrao/fundo-projeto-padrao-3.jpg");

        // Executar os dois casos: lista nula e lista vazia
        projetoService.salvarMetadados(projetoSemLista, "ana@exemplo.com");
        projetoService.salvarMetadados(projetoComListaVazia, "ana@exemplo.com");

        // Conferir o que seria enviado ao banco em cada caso
        ArgumentCaptor<Projeto> projetosEnviadosAoBanco = ArgumentCaptor.forClass(Projeto.class);
        verify(repository, times(2)).save(projetosEnviadosAoBanco.capture());

        List<String> imagensDoCasoNulo = projetosEnviadosAoBanco.getAllValues().get(0).getImagens();
        List<String> imagensDoCasoVazio = projetosEnviadosAoBanco.getAllValues().get(1).getImagens();

        assertNotNull(imagensDoCasoNulo);
        assertEquals(1, imagensDoCasoNulo.size());
        assertTrue(imagensPadrao.contains(imagensDoCasoNulo.get(0)));

        assertNotNull(imagensDoCasoVazio);
        assertEquals(1, imagensDoCasoVazio.size());
        assertTrue(imagensPadrao.contains(imagensDoCasoVazio.get(0)));

        verifyNoInteractions(armazenamentoArquivoService);
    }

    @Test
    @DisplayName("Preserva as imagens que foram fornecidas ao salvar os metadados")
    void salvarMetadadosPreservaImagensEnviadas() {
        // Preparar
        List<String> imagensEnviadas = List.of("imagem-1", "imagem-2");
        Projeto projeto = new Projeto();
        projeto.setTitulo("Horta inteligente");
        projeto.setImagens(imagensEnviadas);

        User autor = new User();
        autor.setId("autor-1");
        when(userRepository.findIdByEmail("ana@exemplo.com")).thenReturn(Optional.of(autor));

        // Executar
        projetoService.salvarMetadados(projeto, "ana@exemplo.com");

        // Conferir se nenhuma imagem foi trocada ou removida antes de salvar
        ArgumentCaptor<Projeto> projetoEnviadoAoBanco = ArgumentCaptor.forClass(Projeto.class);
        verify(repository).save(projetoEnviadoAoBanco.capture());
        assertEquals(imagensEnviadas, projetoEnviadoAoBanco.getValue().getImagens());
        verifyNoInteractions(armazenamentoArquivoService);
    }

    @Test
    @DisplayName("Permite que o autor troque a imagem e preserva os outros dados do projeto")
    void trocarImagemComAutorCorreto() {
        // Preparar
        Projeto projeto = new Projeto();
        projeto.setId("projeto-1");
        projeto.setAutorId("autor-1");
        projeto.setTitulo("Horta inteligente");
        projeto.setResumo("Sistema para monitorar uma horta.");
        projeto.setImagens(List.of("imagem-antiga"));

        User autor = new User();
        autor.setId("autor-1");

        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "nova-imagem.png", "image/png", new byte[]{1, 2, 3});
        ProjetoRespostaDTO imagemSalva = new ProjetoRespostaDTO(
                "imagem-nova", "nova-imagem.png", "imagem-nova", 3, "Arquivo salvo com sucesso");

        when(repository.findById("projeto-1")).thenReturn(Optional.of(projeto));
        when(userRepository.findIdByEmail("ana@exemplo.com")).thenReturn(Optional.of(autor));
        when(armazenamentoArquivoService.salvarArquivo(arquivo)).thenReturn(imagemSalva);
        when(repository.save(any(Projeto.class))).thenReturn(projeto);

        // Executar
        Projeto resultado = projetoService.trocarImagem("projeto-1", arquivo, "ana@exemplo.com");

        // Conferir a imagem nova e os dados que devem continuar iguais
        assertEquals(List.of("imagem-nova"), resultado.getImagens());
        assertEquals("projeto-1", resultado.getId());
        assertEquals("autor-1", resultado.getAutorId());
        assertEquals("Horta inteligente", resultado.getTitulo());
        assertEquals("Sistema para monitorar uma horta.", resultado.getResumo());
        verify(armazenamentoArquivoService).salvarArquivo(arquivo);

        ArgumentCaptor<Projeto> projetoEnviadoAoBanco = ArgumentCaptor.forClass(Projeto.class);
        verify(repository).save(projetoEnviadoAoBanco.capture());
        assertEquals(List.of("imagem-nova"), projetoEnviadoAoBanco.getValue().getImagens());
        assertEquals("projeto-1", projetoEnviadoAoBanco.getValue().getId());
        assertEquals("autor-1", projetoEnviadoAoBanco.getValue().getAutorId());
        assertEquals("Horta inteligente", projetoEnviadoAoBanco.getValue().getTitulo());
        assertEquals("Sistema para monitorar uma horta.", projetoEnviadoAoBanco.getValue().getResumo());
    }

    @Test
    @DisplayName("Impede que outro usuário troque a imagem, sem armazenar ou salvar alterações")
    void trocarImagemComOutroUsuarioLancaExcecao() {
        // Preparar
        Projeto projeto = new Projeto();
        projeto.setId("projeto-1");
        projeto.setAutorId("autor-1");
        projeto.setImagens(List.of("imagem-antiga"));

        User outroUsuario = new User();
        outroUsuario.setId("autor-2");

        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "nova-imagem.png", "image/png", new byte[]{1, 2, 3});

        when(repository.findById("projeto-1")).thenReturn(Optional.of(projeto));
        when(userRepository.findIdByEmail("outro@exemplo.com")).thenReturn(Optional.of(outroUsuario));

        // Executar e conferir a rejeição
        IllegalArgumentException erro = assertThrows(IllegalArgumentException.class,
                () -> projetoService.trocarImagem("projeto-1", arquivo, "outro@exemplo.com"));

        assertEquals("Apenas o autor pode alterar a imagem do projeto", erro.getMessage());
        assertEquals(List.of("imagem-antiga"), projeto.getImagens());
        verifyNoInteractions(armazenamentoArquivoService);
        verify(repository, never()).save(any(Projeto.class));
    }

    @Test
    @DisplayName("Rejeita projeto inexistente sem armazenar imagem ou salvar alterações")
    void trocarImagemDeProjetoInexistenteLancaExcecao() {
        // Preparar
        MockMultipartFile arquivo = new MockMultipartFile(
                "arquivo", "nova-imagem.png", "image/png", new byte[]{1, 2, 3});
        when(repository.findById("projeto-inexistente")).thenReturn(Optional.empty());

        // Executar e conferir a rejeição
        NoSuchElementException erro = assertThrows(NoSuchElementException.class,
                () -> projetoService.trocarImagem("projeto-inexistente", arquivo, "ana@exemplo.com"));

        assertEquals("Projeto não encontrado", erro.getMessage());
        verify(repository).findById("projeto-inexistente");
        verifyNoInteractions(armazenamentoArquivoService, userRepository);
        verify(repository, never()).save(any(Projeto.class));
    }

}
