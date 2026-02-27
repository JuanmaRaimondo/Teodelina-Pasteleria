package com.pasteleria.teodelina.services;

import java.time.Duration;
import java.time.Instant;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.pasteleria.teodelina.entities.Usuario;

@Service
public class TokenService {
    
    private String secret = "12345678";

    public String generarToken(Usuario usuario){
      Algorithm algoritmo =  Algorithm.HMAC256(secret);
        return JWT.create()
                            .withIssuer("teodelina")
                            .withSubject(usuario.getUsername())
                            .withClaim("id", usuario.getId())
                            .withExpiresAt(Instant.now().
                            plus(Duration.ofHours(2)))
                            .sign(algoritmo);

    }

    public String getSubject(String token) {
    try {
        Algorithm algoritmo = Algorithm.HMAC256(secret);
        return JWT.require(algoritmo)
                .withIssuer("teodelina")
                .build()
                .verify(token)
                .getSubject();
    } catch (JWTVerificationException exception) {
        throw new RuntimeException("El token es inválido o ha expirado");
}
    }
}

