package com.pasteleria.teodelina.exceptions;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
