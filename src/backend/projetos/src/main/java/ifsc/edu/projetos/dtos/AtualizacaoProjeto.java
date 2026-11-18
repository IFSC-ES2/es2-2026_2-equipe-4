package ifsc.edu.projetos.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AtualizacaoProjeto(
        @NotBlank(message = "Informe o título") String titulo,
        @NotBlank(message = "Informe o resumo") String resumo,
        @NotEmpty(message = "Informe ao menos um autor")
        List<@NotBlank(message = "Informe um autor válido") String> autores,
        @NotBlank(message = "Informe o tema do projeto") String tema,
        @NotEmpty(message = "Informe ao menos uma tecnologia")
        List<@NotBlank(message = "Informe uma tecnologia válida") String> tecnologias,
        String linkRepositorio,
        String linkDemonstracao) {
}
