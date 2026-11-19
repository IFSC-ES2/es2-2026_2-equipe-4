package ifsc.edu.projetos.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

    @NotBlank(message = "Informe o título")
    private String titulo;

    @NotBlank(message = "Informe o resumo")
    private String resumo;

    @NotEmpty(message = "Informe ao menos um autor")
    private List<@NotBlank(message = "Informe um autor válido") String> autores;

    @NotEmpty(message = "Informe ao menos uma tecnologia")
    private List<@NotBlank(message = "Informe uma tecnologia válida") String> tecnologias;

    @NotBlank(message = "Informe o tema do projeto")
    private String tema;
    private List<String> imagens;
    private String linkRepositorio;
    private String linkDemonstracao;
}