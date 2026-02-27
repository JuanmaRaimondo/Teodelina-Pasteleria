package com.pasteleria.teodelina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
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
    
    public String login(@RequestBody Usuario usuario){
        var authToken = new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword());
        var usuarioAutenticado = authenticationManager.authenticate(authToken);
        var usuarioReal = (Usuario) usuarioAutenticado.getPrincipal();
        return tokenService.generarToken(usuarioReal);
    }
}
