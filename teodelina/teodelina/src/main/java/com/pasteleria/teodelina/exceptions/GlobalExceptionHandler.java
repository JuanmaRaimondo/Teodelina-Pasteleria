package com.pasteleria.teodelina.exceptions;


import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> manejarErroresDeValidacion(MethodArgumentNotValidException ex) {
        
        // 1. Creamos un diccionario vacío para guardar los errores limpios
        Map<String, String> errores = new HashMap<>();

        // 2. Recorremos todos los errores que encontró el patovica
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String campo = error.getField(); // Ej: "precio"
            String mensaje = error.getDefaultMessage(); // Ej: "El precio del producto no puede ser negativo"
            
            // 3. Los guardamos en nuestro diccionario
            errores.put(campo, mensaje);
        });

        // 4. Devolvemos un error 400 (Bad Request) pero con nuestro JSON limpito
        return ResponseEntity.badRequest().body(errores);
    }

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<Map<String, String>> manejarRecursoNoEncontrado(RecursoNoEncontradoException ex) {
        
        // 1. Creamos el diccionario para la respuesta
        Map<String, String> respuesta = new HashMap<>();
        
        // 2. Le sacamos el mensaje a la alarma (el texto que escribiste en el Service)
        respuesta.put("error", ex.getMessage());
        
        // 3. Devolvemos un error 404 (Not Found) con nuestro JSON
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> credencialNoAutorizada(BadCredentialsException credencial){
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("Mensaje"," Usuario o contraseña incorrectos " );
        return new ResponseEntity<>(respuesta, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> accessoDenegado(AccessDeniedException accesoDenegado){
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("Mensaje", "No podes acceder sin permiso");
        return new ResponseEntity<>(respuesta, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> manejarRuntime(RuntimeException e) {
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("error", e.getMessage());
        return new ResponseEntity<>(respuesta, HttpStatus.UNAUTHORIZED);
    }
}
