package ifsc.edu.artigos.accountcreation.exceptions;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;

import org.springframework.dao.DataIntegrityViolationException;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import ifsc.edu.artigos.login.exceptions.AuthException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @Value("${server.servlet.context-path}")
    private String path;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseErro> handleValidationErrors(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> errors.putIfAbsent(error.getField(), error.getDefaultMessage()));

        ResponseErro responseErr = new ResponseErro(400, errors, request.getRequestURI());
        return ResponseEntity.badRequest().header("content-Type", "application/json").body(responseErr);
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ResponseErro> handleAuthException(AuthException ex, HttpServletRequest request) {
        ResponseErro response = new ResponseErro(401, Map.of("mensagem", ex.getMessage()), request.getRequestURI());
        return ResponseEntity.status(401).body(response);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseErro> handleUnreadableRequest(
            HttpMessageNotReadableException ex, HttpServletRequest request) {
        ResponseErro responseErr = new ResponseErro(400, Map.of("mensagem", "JSON inválido ou ausente"),
                request.getRequestURI());
        return ResponseEntity.badRequest().body(responseErr);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ResponseErro> handleMethodNotAllowed(
            HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        ResponseErro responseErr = new ResponseErro(405, Map.of("mensagem", "Método HTTP não permitido"),
                request.getRequestURI());
        return ResponseEntity.status(405).body(responseErr);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseErro> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, String> error = Map.of("mensagem", ex.getMessage());

        ResponseErro responseErr = new ResponseErro(400, error, "requisição");

        return ResponseEntity.badRequest().header("Content-Type","application/json").body(responseErr);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ResponseErro> handleEntityNotFound(NoSuchElementException ex, HttpServletRequest request) {
        ResponseErro responseErr = new ResponseErro(404, Map.of("mensagem", ex.getMessage()), request.getRequestURI());
        return ResponseEntity.status(404).body(responseErr);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseErro> handleDataIntegrity(DataIntegrityViolationException ex, HttpServletRequest request) {
        ResponseErro responseErr = new ResponseErro(409, Map.of("mensagem", "Já existe um registro com os dados informados"), request.getRequestURI());
        return ResponseEntity.status(409).body(responseErr);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseErro> handleGeneric(Exception ex, HttpServletRequest request) {
        ResponseErro responseErr = new ResponseErro(500, Map.of("mensagem", "Erro interno no servidor"), request.getRequestURI());
        return ResponseEntity.status(500).body(responseErr);
    }

}
