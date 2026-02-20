# Teodelina-Pasteleria
Backend en Java y Spring Boot para la automatización de una pastelería. Integra un sistema multi-agente de IA (Java ADK) para gestionar reservas en Google Calendar, analizar métricas de ventas y redactar posteos para Instagram con supervisión humana (HITL).
# 🍰 Pastelería AI Backend

Este es el backend principal para la gestión automatizada de una pastelería, construido con **Java** y **Spring Boot**. El sistema no solo expone APIs REST tradicionales, sino que integra un **Sistema Multi-Agente de Inteligencia Artificial (Nivel 3)** utilizando el Agent Development Kit (ADK) de Google.

El objetivo del proyecto es liberar tiempo operativo delegando tareas de logística, análisis y marketing a agentes especializados, manteniendo siempre el control final sobre las acciones críticas.

## 🚀 Características Principales (V1.0)

El sistema opera con un **Agente Coordinador** que delega tareas a tres herramientas principales:

1. **🗓️ Gestión de Logística (Google Calendar):**
   - Integración con la API de Google Calendar.
   - Consulta de disponibilidad de fechas y agendamiento automático de entregas.
   
2. **📊 Análisis de Métricas (Dashboard):**
   - Acceso a la base de datos relacional para obtener resúmenes de ventas.
   - Identificación de productos más vendidos y rendimiento de campañas.

3. **📱 Marketing en Instagram con HITL (Humano en el Bucle):**
   - Redacción automatizada de borradores para posteos e historias (ej. Campañas de Pascua).
   - **Mecanismo de Seguridad:** El agente *no* publica directamente. Guarda el contenido en la base de datos bajo un estado de "PENDIENTE".
   - Un endpoint específico permite al dueño revisar el borrador y aprobar la publicación final a través de la API de Meta.

## 🛠️ Stack Tecnológico

* **Core:** Java 17+ y Spring Boot (Web, Data JPA, Security).
* **Inteligencia Artificial:** Google Agent Development Kit (Java ADK).
* **Base de Datos:** PostgreSQL / MySQL (Configurable).
* **Integraciones Externas:** Google Calendar API, Meta Graph API (Instagram).

## 📂 Arquitectura del Proyecto

El código sigue una Arquitectura Limpia estándar, separando la lógica de negocio de la lógica del agente:

* `controller/`: Endpoints HTTP REST para el frontend y el chat con el agente.
* `service/`: Lógica de negocio clásica. Aquí se definen los métodos transaccionales que luego se exponen como *Tools* (herramientas) para el ADK.
* `repository/`: Interfaces de Spring Data JPA para el acceso a la base de datos.
* `entity/`: Entidades del dominio (ej. `InstagramPostEntity`).
* `dto/`: Objetos de transferencia de datos para la comunicación segura.

## ⚙️ Configuración Inicial (Getting Started)

1. Clona el repositorio: `git clone https://github.com/tu-usuario/pasteleria-ai-backend.git`
2. Configura las variables de entorno en tu archivo `application.yml` o `.env`:
   - `GOOGLE_API_KEY`: Para el acceso al modelo LLM.
   - `DB_URL`, `DB_USER`, `DB_PASSWORD`: Credenciales de la base de datos.
3. Ejecuta la aplicación: `./mvnw spring-boot:run`
