package com.pasteleria.teodelina.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AsistenteFinancieroService {
    
    @Autowired
    private PedidoService pedidoService;

    @Value("${google.gemini.api.key}")
    private String apiKey;

    public String consultorIA(String prompt){
        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" + apiKey.trim();
        System.out.println("LLamando a la url" + url);
        Map<String, Object> requestBody = Map.of("contents",
         List.of(Map.of("parts", 
            List.of(Map.of("text", prompt)))));

            // 1. Instanciamos a nuestro "Postman" interno
            RestTemplate restTemplate = new RestTemplate();

            // 2. Disparamos la petición POST (le pasamos la URL, el paquete, y le decimos que esperamos un String de respuesta)
            String respuestaDeGoogle = restTemplate.postForObject(url, requestBody, String.class);

            // 3. Imprimimos lo que nos contestó el cerebro de Google
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(respuestaDeGoogle);
                
                // Navegamos: candidates[0] -> content -> parts[0] -> text
                String textoLimpio = root.path("candidates").get(0)
                                         .path("content")
                                         .path("parts").get(0)
                                         .path("text").asText();
                
                System.out.println("🤖 IA dice: " + textoLimpio);
                return textoLimpio;
                
            } catch (Exception e) {
                System.out.println("Hubo un error limpiando el JSON: " + e.getMessage());
                return "Error al procesar la respuesta de la IA.";
            }

            
        
        
    }

    public String analisisFinanciero(){
        Double ingresos = pedidoService.calcularIngresosPorEstado("SEÑADO");
        Double ticketPromedio = pedidoService.calcularTicketPromedioPorEstado("SEÑADO");

        if (ingresos == null) ingresos = 0.0;
        if (ticketPromedio == null) ticketPromedio = 0.0;

        String promptContexto = "Actúa como un asesor financiero y de marketing experto en pastelerías. " +
                "Soy el dueño de la pastelería Teodelina. Estos son mis números actuales de pedidos SEÑADOS(es decir, clientes que dejaron un anticipo): " +
                "Ingresos totales por señas: $" + ingresos + ". " +
                "Ticket promedio por señas: $" + ticketPromedio + ". " +
                "Por favor, hacé un análisis muy breve y motivador de estos números (máximo 2 renglones) " +
                "y dame 2 consejos prácticos y creativos para aumentar el ticket promedio vendiendo postres. " +
                "No uses formato Markdown complicado, respondé en texto claro.";

        System.out.println("Enviando reporte a la IA: " + promptContexto);

        return consultorIA(promptContexto);
    }
}
