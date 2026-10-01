package ifsc.edu.projetos.controllers;

import ifsc.edu.projetos.dtos.Projeto;
import ifsc.edu.projetos.dtos.ProjetoRespostaDTO;
import ifsc.edu.projetos.services.ProjetoService;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscarPorId(@PathVariable String id){
        return projetoService.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Projeto> listarTodos(){
        return projetoService.listarTodos();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> argumentoInvalido(IllegalArgumentException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("erro", ex.getMessage());
        return ResponseEntity.badRequest().body(body);
    }

}