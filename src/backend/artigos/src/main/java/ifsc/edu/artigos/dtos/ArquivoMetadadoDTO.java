package ifsc.edu.artigos.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document("artigos")
public class ArquivoMetadadoDTO {

    @Id
    private String id;

    private String titulo;
    private String resumo;
    private List<String> autores;
    private List<String> palavrasChave;
    private String areaConhecimento;
    private String caminhoArquivo;
}