package ifsc.edu.projetos.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document("projetos")
public class Projeto {

    @Id
    private String id;

    private String autorId;

    private String titulo;
    private String resumo;
    private List<String> autores;
    private List<String> tecnologias;
    private String tema;
    private List<String> imagens;
    private String linkRepositorio;
    private String linkDemonstracao;
}