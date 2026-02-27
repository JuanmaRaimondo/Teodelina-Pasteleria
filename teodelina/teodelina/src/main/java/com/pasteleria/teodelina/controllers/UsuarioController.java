package com.pasteleria.teodelina.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pasteleria.teodelina.entities.Usuario;
import com.pasteleria.teodelina.services.TokenService;
import com.pasteleria.teodelina.services.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // 1. ¡FALTABA ESTA LÍNEA! Hay que presentar al TokenService
    @Autowired
    private TokenService tokenService; 

    @PostMapping("/registrar")
    public Usuario crearUsuario(@RequestBody Usuario usuario){
       return usuarioService.registrarUsuario(usuario);
    }

    @PostMapping("/login")
        public ResponseEntity<Map<String, String>> login(@RequestBody Usuario usuarioLogeado) {
            System.out.println("🎙️ 1. Entrando al método login");
            
            var authToken = new UsernamePasswordAuthenticationToken(usuarioLogeado.getUsername(), usuarioLogeado.getPassword());
            var usuarioAutenticado = authenticationManager.authenticate(authToken);
            var usuarioReal = (Usuario) usuarioAutenticado.getPrincipal();

            System.out.println("🎙️ 2. Usuario autenticado: " + usuarioReal.getUsername());
            
            // Generamos el token
            var token = tokenService.generarToken(usuarioReal);
            System.out.println("🎙️ 3. Token generado: " + token);
            
            // Empaquetamos en JSON
            Map<String, String> respuesta = new HashMap<>();
            respuesta.put("token", token);
            
            return ResponseEntity.ok(respuesta);
        }
}
