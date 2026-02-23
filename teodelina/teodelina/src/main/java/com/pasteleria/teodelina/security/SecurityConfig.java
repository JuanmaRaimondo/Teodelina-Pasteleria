package com.pasteleria.teodelina.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // 1. Desactivamos el escudo anti-formularios (CSRF)
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated()) // 2. Pedimos usuario/clave para todo
            .httpBasic(Customizer.withDefaults()); // 3. Le decimos que acepte el "Basic Auth" de Postman
            
        return http.build();
    }
}