package com.pasteleria.teodelina.entities;

import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String rol;
    

    public Usuario(){} 
    

    public Usuario(Long id, String username, String password, String rol) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.rol = rol;
        
    }

    
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getRol() {
        return rol;
    }


    public void setRol(String rol) {
        this.rol = rol;
    }
 

  // 1. EL ROL: Convertimos tu texto "ADMIN" al idioma de Spring Security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring espera que los roles empiecen con "ROLE_", así que se lo concatenamos.
        // Tenés que importar SimpleGrantedAuthority y List (java.util.List)
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.rol));
    }

    // 2. LA CONTRASEÑA
    @Override
    public String getPassword() {
        return this.password; // Le pasamos el atributo que vos creaste
    }

    // 3. EL USUARIO
    @Override
    public String getUsername() {
        return this.username; // Le pasamos el atributo que vos creaste
    }

    // --- LAS 4 PREGUNTAS DEL PATOVICA ---
    // Como tu pastelería recién arranca, no vamos a tener cuentas bloqueadas ni expiradas.
    // Le decimos a todo que SÍ (true) para que la cuenta funcione siempre.

    @Override
    public boolean isAccountNonExpired() {
        return true; // ¿La cuenta no expiró? Sí.
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // ¿La cuenta no está bloqueada? Sí.
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // ¿La contraseña no expiró? Sí.
    }

    @Override
    public boolean isEnabled() {
        return true; // ¿El usuario está habilitado? Sí.
    }

}
