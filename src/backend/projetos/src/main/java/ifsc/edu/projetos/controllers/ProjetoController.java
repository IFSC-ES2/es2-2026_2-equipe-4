package ifsc.edu.projetos.controllers;

import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.services.ProjetoService;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.security.core.Authentication;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.*;



@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    private final ProjetoService projetoService;

    public ProjetoController(ProjetoService arquivoService) {
        this.projetoService = arquivoService;
    }

    // Rota 1: apenas o arquivo (multipart/form-data)
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ProjetoRespostaDTO> uploadArquivo(
            @RequestParam("arquivo") MultipartFile arquivo) {

        ProjetoRespostaDTO resposta = projetoService.salvarArquivo(arquivo);
        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

    // Rota 2: apenas os metadados (application/json)
    @PostMapping(value = "/metadados", consumes = "application/json")
    public ResponseEntity<Projeto> enviarMetadados(
            @RequestBody Projeto metadadoDTO, Authentication authentication) {

        Projeto salvo = projetoService.salvarMetadados(metadadoDTO, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    // Rota 3: troca a imagem do projeto (multipart/form-data, campo "arquivo")
    @PutMapping(value = "/{id}/imagem", consumes = "multipart/form-data")
    public ResponseEntity<Projeto> trocarImagem(@PathVariable String id,
            @RequestParam("arquivo") MultipartFile arquivo, Authentication authentication) {

        Projeto atualizado = projetoService.trocarImagem(id, arquivo, authentication.getName());
        return ResponseEntity.ok(atualizado);
    }

    // Rota 4: devolve uma imagem enviada pelo upload (pública, como as demais rotas GET /projetos/**)
    @GetMapping("/imagens/{id}")
    public ResponseEntity<Resource> buscarImagem(@PathVariable String id) {
        Optional<GridFsResource> encontrado = projetoService.buscarArquivo(id);
        if (encontrado.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        GridFsResource imagem = encontrado.get();
        MediaType tipo = tipoDaImagem(imagem);
        // Só serve imagens: outros tipos enviados (ex.: HTML) poderiam executar código no navegador
        if (tipo == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(tipo)
                .header("X-Content-Type-Options", "nosniff")
                .cacheControl(CacheControl.maxAge(Duration.ofDays(7)).cachePublic())
                .body(imagem);
    }

    private MediaType tipoDaImagem(GridFsResource arquivo) {
        try {
            MediaType tipo = MediaType.parseMediaType(arquivo.getContentType());
            boolean imagemSegura = "image".equals(tipo.getType()) && !"svg+xml".equals(tipo.getSubtype());
            return imagemSegura ? tipo : null;
        } catch (RuntimeException e) {
            return null; // sem tipo salvo ou tipo inválido
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> argumentoInvalido(IllegalArgumentException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("erro", ex.getMessage());
        return ResponseEntity.badRequest().body(body);
    }

}