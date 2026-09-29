package ifsc.edu.artigos.controllers;

import ifsc.edu.artigos.dtos.Projeto;
import ifsc.edu.artigos.dtos.ProjetoRespostaDTO;
import ifsc.edu.artigos.services.ProjetoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;



@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    private final ProjetoService arquivoService;

    public ProjetoController(ProjetoService arquivoService) {
        this.arquivoService = arquivoService;
    }

    // Rota 1: apenas o arquivo (multipart/form-data)
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ProjetoRespostaDTO> uploadArquivo(
            @RequestParam("arquivo") MultipartFile arquivo) {

        ProjetoRespostaDTO resposta = arquivoService.salvarArquivo(arquivo);
        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

    // Rota 2: apenas os metadados (application/json)
    @PostMapping(value = "/metadados", consumes = "application/json")
    public ResponseEntity<Projeto> enviarMetadados(
            @RequestBody Projeto metadadoDTO) {

        Projeto salvo = arquivoService.salvarMetadados(metadadoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> argumentoInvalido(IllegalArgumentException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("erro", ex.getMessage());
        return ResponseEntity.badRequest().body(body);
    }

}