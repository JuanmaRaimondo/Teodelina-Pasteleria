package com.pasteleria.teodelina.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.pasteleria.teodelina.repository.UsuarioRepository;
import com.pasteleria.teodelina.services.TokenService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class SecurityFiltrer extends OncePerRequestFilter {
    
    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 1. Obtener el token del encabezado (Header)
        var authHeader = request.getHeader("Authorization");

        if (authHeader != null) {
           try {
        var token = authHeader.replace("Bearer ", "");
        var nombreUsuario = tokenService.getSubject(token); 

                    if (nombreUsuario != null) {   
                        var usuario = usuarioRepository.findByUsername(nombreUsuario)
                                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado")); 
                        var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                        
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
        } catch (RuntimeException e) {
        // Por ahora, solo lo imprimimos para ver que funciona
        resolver.resolveException(request, response, null, e);
        
        
            
        }

        // 2. Pase lo que pase, que la petición siga su curso
        filterChain.doFilter(request, response);
    }
}
}