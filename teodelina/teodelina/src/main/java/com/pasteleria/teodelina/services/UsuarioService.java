package com.pasteleria.teodelina.services; // (Asegurate de que sea tu ruta correcta)

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pasteleria.teodelina.entities.Usuario;
import com.pasteleria.teodelina.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ¡Este es el método que Spring Security llama automáticamente cuando alguien hace Login!
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // Usamos el método mágico que creaste en el Repository
        return usuarioRepository.findByUsername(username)
                // ¿Te suena familiar esto? ¡Es lo que aprendiste hoy con las excepciones!
                .orElseThrow(() -> new UsernameNotFoundException("¡Alto ahí! No se encontró el usuario: " + username));
    }

    public Usuario registrarUsuario(Usuario usuario){
        String contraseniaSinEncriptar = usuario.getPassword();
        String contraseniaEncriptada = passwordEncoder.encode(contraseniaSinEncriptar);
        usuario.setPassword(contraseniaEncriptada);
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return usuarioGuardado;
    }
}