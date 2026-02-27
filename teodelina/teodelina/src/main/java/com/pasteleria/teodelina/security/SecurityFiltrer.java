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
    
    System.out.println("🚨 ATENCIÓN: Llegó una petición " + request.getMethod() + " a la ruta: " + request.getRequestURI());
    
    // 1. Obtener el token del encabezado (Header)
    var authHeader = request.getHeader("Authorization");

    if (authHeader != null) {
        try {
            var token = authHeader.replace("Bearer ", "");
            System.out.println("1. Token limpio recibido: " + token); // <--- Micrófono 1

            var nombreUsuario = tokenService.getSubject(token); 
            System.out.println("2. Usuario extraído del token: " + nombreUsuario); // <--- Micrófono 2

            if (nombreUsuario != null) {   
                var usuario = usuarioRepository.findByUsername(nombreUsuario)
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en la BD")); 
                
                System.out.println("3. Permisos del usuario: " + usuario.getAuthorities()); // <--- Micrófono 3

                var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("4. ¡Usuario autenticado exitosamente en el contexto!"); // <--- Micrófono 4
            }
        } catch (RuntimeException e) {
            System.out.println("ERROR EN EL FILTRO: " + e.getMessage());
            resolver.resolveException(request, response, null, e);
            
            // 🛑 CORTAMOS ACÁ: Si el token está mal, devolvemos el error y frenamos la petición.
            return; 
        }
    }

    // 🟢 LA LLAVE MÁGICA 🟢
    // Esta línea le dice a la petición: "Ya te revisé, podés seguir tu camino hacia el Controller".
    // Tiene que estar sí o sí afuera del 'if' para que el Login (que no tiene token) pueda pasar.
    filterChain.doFilter(request, response);
}
}