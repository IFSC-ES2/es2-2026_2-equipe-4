package ifsc.edu.projetos.services;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.AtualizacaoProjeto;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.security.access.AccessDeniedException;
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
    private final MongoTemplate mongoTemplate;

    public ProjetoService(ProjetoRepository projetoRepository, ArmazenamentoArquivoService armazenamentoArquivoService,
                          UserRepository userRepository, MongoTemplate mongoTemplate) {
        this.projetoRepository = projetoRepository;
        this.armazenamentoArquivoService = armazenamentoArquivoService;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public ProjetoRespostaDTO salvarArquivo(MultipartFile arquivo) {
        return armazenamentoArquivoService.salvarArquivo(arquivo);
    }

    public Optional<GridFsResource> buscarArquivo(String id) {
        return armazenamentoArquivoService.buscarArquivo(id);
    }

    public void excluirProjeto(String id, String emailAutor) {
        String autorId = userRepository.findIdByEmail(emailAutor).map(User::getId).orElse(null);
        if (autorId != null && projetoRepository.deleteByIdAndAutorId(id, autorId) > 0) {
            return;
        }

        if (projetoRepository.existsById(id)) {
            throw new AccessDeniedException("Apenas o autor pode excluir o projeto");
        }
        throw new NoSuchElementException("Projeto não encontrado");
    }

    public Projeto atualizarProjeto(String id, AtualizacaoProjeto dados, String emailAutor) {
        String autorId = userRepository.findIdByEmail(emailAutor).map(User::getId).orElse(null);
        if (autorId != null) {
            Query filtro = Query.query(Criteria.where("_id").is(id).and("autorId").is(autorId));
            Update alteracoes = new Update()
                    .set("titulo", dados.titulo())
                    .set("resumo", dados.resumo())
                    .set("autores", dados.autores())
                    .set("tema", dados.tema())
                    .set("tecnologias", dados.tecnologias())
                    .set("linkRepositorio", dados.linkRepositorio())
                    .set("linkDemonstracao", dados.linkDemonstracao());
            Projeto atualizado = mongoTemplate.findAndModify(
                    filtro, alteracoes, FindAndModifyOptions.options().returnNew(true), Projeto.class);
            if (atualizado != null) return atualizado;
        }

        if (projetoRepository.existsById(id)) {
            throw new AccessDeniedException("Apenas o autor pode editar o projeto");
        }
        throw new NoSuchElementException("Projeto não encontrado");
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
        List<String> imagens = List.of(imagem.getId());
        if (projetoRepository.atualizarImagens(id, autorId, imagens) == 0) {
            armazenamentoArquivoService.removerArquivo(imagem.getId());
            throw new NoSuchElementException("Projeto não encontrado");
        }
        projeto.setImagens(imagens);
        return projeto;
    }

    public List<Projeto> listarTodos(){
        return projetoRepository.findAll();
    }

    // Retorna Optional porque o id pode não existir; o controller traduz o vazio em 404
    public Optional<Projeto> buscarPorId(String id){
        return projetoRepository.findById(id);
    }
}
