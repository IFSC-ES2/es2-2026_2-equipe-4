package ifsc.edu.artigos.dtos;

public class ArquivoRespostaDTO {

    private String id;
    private String nomeOriginal;
    private String caminhoArmazenado;
    private long tamanhoBytes;
    private String mensagem;

    public ArquivoRespostaDTO(String id, String nomeOriginal, String caminhoArmazenado,
                              long tamanhoBytes, String mensagem) {
        this.id = id;
        this.nomeOriginal = nomeOriginal;
        this.caminhoArmazenado = caminhoArmazenado;
        this.tamanhoBytes = tamanhoBytes;
        this.mensagem = mensagem;
    }

    public String getId() { return id; }
    public String getNomeOriginal() { return nomeOriginal; }
    public String getCaminhoArmazenado() { return caminhoArmazenado; }
    public long getTamanhoBytes() { return tamanhoBytes; }
    public String getMensagem() { return mensagem; }
}