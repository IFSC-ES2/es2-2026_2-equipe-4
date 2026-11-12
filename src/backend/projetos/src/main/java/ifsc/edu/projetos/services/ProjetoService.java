package ifsc.edu.projetos.services;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;

@Service
public class ProjetoService {

    private final ProjetoRepository projetoRepository;
    private final ArmazenamentoArquivoService armazenamentoArquivoService;
    private final UserRepository userRepository; // Usado para descobrir o id do usuário logado a partir do e-mail

    public ProjetoService(ProjetoRepository projetoRepository, ArmazenamentoArquivoService armazenamentoArquivoService,
                          UserRepository userRepository) {
        this.projetoRepository = projetoRepository;
        this.armazenamentoArquivoService = armazenamentoArquivoService;
        this.userRepository = userRepository;
    }

    public ProjetoRespostaDTO salvarArquivo(MultipartFile arquivo) {
        return armazenamentoArquivoService.salvarArquivo(arquivo);
    }

    public Optional<GridFsResource> buscarArquivo(String id) {
        return armazenamentoArquivoService.buscarArquivo(id);
    }

    // emailAutor vem do token JWT (authentication.getName() no controller), nunca do corpo da requisição
    public Projeto salvarMetadados(Projeto metadadoDTO, String emailAutor) {
        if (metadadoDTO.getTitulo() == null || metadadoDTO.getTitulo().isBlank()) {
            throw new IllegalArgumentException("Nome do arquivo é obrigatório nos metadados");
        }

        // Converte o e-mail do usuário logado no id dele (a busca traz só o _id, sem carregar o documento inteiro)
        String autorId = userRepository.findIdByEmail(emailAutor)
                .map(User::getId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário autor não encontrado"));

        // Zera o id para o Mongo gerar um novo, evitando sobrescrever um projeto existente
        metadadoDTO.setId(null);
        // Sobrescreve o autorId enviado no JSON: o autor é sempre quem está logado, senão qualquer usuário poderia publicar um projeto em nome de outra pessoa
        metadadoDTO.setAutorId(autorId);
        // Sem imagem enviada, o projeto recebe uma das imagens padrão
        if (metadadoDTO.getImagens() == null || metadadoDTO.getImagens().isEmpty()) {
            metadadoDTO.setImagens(List.of(imagemPadraoAleatoria()));
        }
        return projetoRepository.save(metadadoDTO);
    }

    // As imagens padrão ficam no front-end, em src/frontend/public/imagens-padrao
    public static String imagemPadraoAleatoria() {
        int numero = new Random().nextInt(3) + 1;
        return "/imagens-padrao/fundo-projeto-padrao-" + numero + ".jpg";
    }

    // Substitui a imagem do projeto pela enviada; só o autor pode trocar
    public Projeto trocarImagem(String id, MultipartFile arquivo, String emailAutor) {
        Projeto projeto = projetoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Projeto não encontrado"));

        String autorId = userRepository.findIdByEmail(emailAutor).map(User::getId).orElse(null);
        if (autorId == null || !autorId.equals(projeto.getAutorId())) {
            throw new IllegalArgumentException("Apenas o autor pode alterar a imagem do projeto");
        }

        ProjetoRespostaDTO imagem = armazenamentoArquivoService.salvarArquivo(arquivo);
        projeto.setImagens(List.of(imagem.getId()));
        return projetoRepository.save(projeto);
    }

    public List<Projeto> listarTodos(){
        return projetoRepository.findAll();
    }

    // Retorna Optional porque o id pode não existir; o controller traduz o vazio em 404
    public Optional<Projeto> buscarPorId(String id){
        return projetoRepository.findById(id);
    }
}