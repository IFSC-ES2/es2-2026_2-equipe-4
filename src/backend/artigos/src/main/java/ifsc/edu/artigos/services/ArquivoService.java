package ifsc.edu.artigos.services;

import ifsc.edu.artigos.dtos.ArquivoMetadadoDTO;
import ifsc.edu.artigos.dtos.ArquivoRespostaDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class ArquivoService {

    private static final String DIRETORIO_UPLOAD = "uploads/";

    // "banco" em memória só pra exemplo — troque por JPA/Repository depois
    private final Map<String, ArquivoMetadadoDTO> metadadosArmazenados = new ConcurrentHashMap<>();

    public ArquivoRespostaDTO salvarArquivo(MultipartFile arquivo) {
        if (arquivo == null || arquivo.isEmpty()) {
            throw new IllegalArgumentException("Arquivo não pode estar vazio");
        }

        try {
            Path diretorio = Paths.get(DIRETORIO_UPLOAD);
            if (!Files.exists(diretorio)) {
                Files.createDirectories(diretorio);
            }

            String id = UUID.randomUUID().toString();
            String nomeOriginal = arquivo.getOriginalFilename();
            String extensao = nomeOriginal != null && nomeOriginal.contains(".")
                    ? nomeOriginal.substring(nomeOriginal.lastIndexOf("."))
                    : "";

            String nomeArmazenado = id + extensao;
            Path caminhoDestino = diretorio.resolve(nomeArmazenado);

            Files.copy(arquivo.getInputStream(), caminhoDestino, StandardCopyOption.REPLACE_EXISTING);

            return new ArquivoRespostaDTO(
                    id,
                    nomeOriginal,
                    caminhoDestino.toString(),
                    arquivo.getSize(),
                    "Arquivo salvo com sucesso"
            );

        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar arquivo: " + e.getMessage(), e);
        }
    }

    public ArquivoMetadadoDTO salvarMetadados(ArquivoMetadadoDTO metadadoDTO) {
        if (metadadoDTO.getNomeArquivo() == null || metadadoDTO.getNomeArquivo().isBlank()) {
            throw new IllegalArgumentException("Nome do arquivo é obrigatório nos metadados");
        }

        String chave = UUID.randomUUID().toString();
        metadadosArmazenados.put(chave, metadadoDTO);
        return metadadoDTO;
    }
}