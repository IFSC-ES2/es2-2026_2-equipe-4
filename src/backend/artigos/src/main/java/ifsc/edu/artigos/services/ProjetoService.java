package ifsc.edu.artigos.services;

import ifsc.edu.artigos.dtos.Projeto;
import ifsc.edu.artigos.dtos.ProjetoRespostaDTO;
import ifsc.edu.artigos.repositories.ProjetoRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProjetoService {

    private final ProjetoRepository repository;
    private final GridFsTemplate gridFsTemplate; // Configuração do GridFS para armazenar arquivos no MongoDB

    public ProjetoService(ProjetoRepository repository, GridFsTemplate gridFsTemplate) {
        this.repository = repository;
        this.gridFsTemplate = gridFsTemplate;
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

    public Projeto salvarMetadados(Projeto metadadoDTO) {
        if (metadadoDTO.getTitulo() == null || metadadoDTO.getTitulo().isBlank()) {
            throw new IllegalArgumentException("Nome do arquivo é obrigatório nos metadados");
        }

        metadadoDTO.setId(null);
        return repository.save(metadadoDTO);
    }
}