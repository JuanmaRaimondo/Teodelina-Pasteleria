package com.pasteleria.teodelina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pasteleria.teodelina.services.AsistenteFinancieroService;

@RestController
@RequestMapping("/asistente")
public class AsistenteFinancieroController {
    
    @Autowired
    private AsistenteFinancieroService asistenteService;

    @GetMapping("/prueba")
    public String probarIA() {
        // Le mandamos un prompt fijo solo para ver si responde
        return asistenteService.consultorIA("Hola, soy una pastelería de Tucumán. Decime una frase motivadora cortita para arrancar el día.");
    }

    @GetMapping("/reporte")
    public String obtenerReporteFinanciero() {
        return asistenteService.analisisFinanciero();
    }
}
