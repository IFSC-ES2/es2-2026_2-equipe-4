package ifsc.edu.artigos.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class ConfiguracaoController {

    // GET /  -> raiz da API
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> raiz() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("mensagem", "API rodando com sucesso");
        body.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(body);
    }

    // GET /status -> health check simples
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("check", "OK");
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    // GET /info -> metadados da aplicação
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("aplicacao", "Artigos API");
        body.put("versao", "1.0.0");
        body.put("ambiente", "development");
        return ResponseEntity.ok(body);
    }
}