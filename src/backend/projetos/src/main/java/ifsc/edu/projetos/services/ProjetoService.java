package ifsc.edu.projetos.services;

import ifsc.edu.projetos.accountcreation.entity.User;
import ifsc.edu.projetos.accountcreation.repository.UserRepository;
import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.repositories.ProjetoRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProjetoService {

    private final ProjetoRepository repository;
    private final GridFsTemplate gridFsTemplate; // Configuração do GridFS para armazenar arquivos no MongoDB
    private final UserRepository userRepository; // Usado para descobrir o id do usuário logado a partir do e-mail

    public ProjetoService(ProjetoRepository repository, GridFsTemplate gridFsTemplate,
                          UserRepository userRepository) {
        this.repository = repository;
        this.gridFsTemplate = gridFsTemplate;
        this.userRepository = userRepository;
    }

    public ProjetoRespostaDTO salvarArquivo(MultipartFile arquivo) {
        if (arquivo == null || arquivo.isEmpty()) {
            throw new IllegalArgumentException("Arquivo não pode estar vazio");
        }

        try {
            String nomeOriginal = arquivo.getOriginalFilename();

    
            Document metadata = new Document();
            metadata.put("contentType", arquivo.getContentType());
            metadata.put("size", arquivo.getSize());

            ObjectId fileId = gridFsTemplate.store(
                    arquivo.getInputStream(),
                    nomeOriginal,
                    arquivo.getContentType(),
                    metadata
            );

            return new ProjetoRespostaDTO(
                    fileId.toHexString(),
                    nomeOriginal,
                    fileId.toHexString(), // referência do path local
                    arquivo.getSize(),
                    "Arquivo salvo com sucesso"
            );

        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo: " + e.getMessage(), e);
        }
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
        return repository.save(metadadoDTO);
    }

    public List<Projeto> listarTodos(){
        return repository.findAll();
    }

    // Retorna Optional porque o id pode não existir; o controller traduz o vazio em 404
    public Optional<Projeto> buscarPorId(String id){
        return repository.findById(id);
    }
}