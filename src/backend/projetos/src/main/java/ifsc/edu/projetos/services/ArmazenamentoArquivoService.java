package ifsc.edu.projetos.services;

import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import org.bson.Document;
import org.bson.types.ObjectId;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ArmazenamentoArquivoService {

    private final GridFsTemplate gridFsTemplate;

    public ArmazenamentoArquivoService(GridFsTemplate gridFsTemplate) {
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
                    fileId.toHexString(),
                    arquivo.getSize(),
                    "Arquivo salvo com sucesso"
            );
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo: " + e.getMessage(), e);
        }
    }

    // Busca um arquivo salvo pelo id devolvido no upload; vazio se o id for inválido ou não existir
    public Optional<GridFsResource> buscarArquivo(String id) {
        if (id == null || !ObjectId.isValid(id)) {
            return Optional.empty();
        }

        GridFSFile arquivo = gridFsTemplate.findOne(
                Query.query(Criteria.where("_id").is(new ObjectId(id))));

        if (arquivo == null) {
            return Optional.empty();
        }
        return Optional.of(gridFsTemplate.getResource(arquivo));
    }
}
