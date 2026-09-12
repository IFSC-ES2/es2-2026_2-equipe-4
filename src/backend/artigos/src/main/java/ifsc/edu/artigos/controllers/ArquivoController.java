package ifsc.edu.artigos.controllers;

import ifsc.edu.artigos.dtos.ArquivoMetadadoDTO;
import ifsc.edu.artigos.dtos.ArquivoRespostaDTO;
import ifsc.edu.artigos.services.ArquivoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;



@RestController
@RequestMapping("/arquivos")
public class ArquivoController {

    private final ArquivoService arquivoService;

    public ArquivoController(ArquivoService arquivoService) {
        this.arquivoService = arquivoService;
    }

    // Rota 1: apenas o arquivo (multipart/form-data)
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ArquivoRespostaDTO> uploadArquivo(
            @RequestParam("arquivo") MultipartFile arquivo) {

        ArquivoRespostaDTO resposta = arquivoService.salvarArquivo(arquivo);
        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

    // Rota 2: apenas os metadados (application/json)
    @PostMapping(value = "/metadados", consumes = "application/json")
    public ResponseEntity<ArquivoMetadadoDTO> enviarMetadados(
            @RequestBody ArquivoMetadadoDTO metadadoDTO) {

        ArquivoMetadadoDTO salvo = arquivoService.salvarMetadados(metadadoDTO);
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