package ifsc.edu.artigos.dtos;

// No futuro usar lombok para gerar getters e setters automaticamente
// evitar boilerplate code. Exemplo: @Data, @Getter, @Setter, etc.

public class ArquivoMetadadoDTO {

    private String nomeArquivo;
    private String descricao;
    private String autor;
    private String categoria;

    public ArquivoMetadadoDTO() {}

    public ArquivoMetadadoDTO(String nomeArquivo, String descricao, String autor, String categoria) {
        this.nomeArquivo = nomeArquivo;
        this.descricao = descricao;
        this.autor = autor;
        this.categoria = categoria;
    }

    public String getNomeArquivo() { return nomeArquivo; }
    public void setNomeArquivo(String nomeArquivo) { this.nomeArquivo = nomeArquivo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
}