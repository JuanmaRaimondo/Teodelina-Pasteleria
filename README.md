# Teodelina-Pasteleria
Backend in Java and Spring Boot for automating a pastry shop. It integrates a multi-agent AI system (Java ADK) to manage reservations in Google Calendar, analyze sales metrics, and write Instagram posts with human supervision (HITL).

# 🍰 Pastry Shop AI Backend

This is the main backend for the automated management of a pastry shop, built with **Java** and **Spring Boot**. The system not only exposes traditional REST APIs but also integrates a **Level 3 Multi-Agent Artificial Intelligence System** using Google's Agent Development Kit (ADK).

The project's objective is to free up operational time by delegating logistics, analysis, and marketing tasks to specialized agents, while always maintaining final control over critical actions.

## 🚀 Main Features (V1.0)

The system operates with a **Coordinator Agent** who delegates tasks to three main tools:

1. **🗓️ Logistics Management (Google Calendar):**

- Integration with the Google Calendar API.

- Checking date availability and automatic scheduling of deliveries.

2. **📊 Metrics Analysis (Dashboard):**

- Access to the relational database to obtain sales summaries.

- Identification of best-selling products and campaign performance.

3. **📱 Instagram Marketing with HITL (Human in the Loop):**

- Automated drafting of posts and stories (e.g., Easter campaigns).

- **Security Mechanism:** The agent *does not* publish directly. It saves the content in the database with a "PENDING" status.

- A specific endpoint allows the owner to review the draft and approve the final release via the Meta API.

## 🛠️ Technology Stack

* **Core:** Java 17+ and Spring Boot (Web, Data JPA, Security).

* **Artificial Intelligence:** Google Agent Development Kit (Java ADK).

* **Database:** PostgreSQL / MySQL (Configurable).

* **External Integrations:** Google Calendar API, Meta Graph API (Instagram).

## 📂 Project Architecture

The code follows a standard Clean Architecture, separating business logic from agent logic:

* `controller/`: HTTP REST endpoints for the frontend and chat with the agent.

* `service/`: Classic business logic. Transactional methods are defined here and then exposed as *Tools* for the ADK.

* * `repository/`: Spring Data JPA interfaces for database access.

* `entity/`: Domain entities

* `dto/`: Data transfer objects for secure communication.


