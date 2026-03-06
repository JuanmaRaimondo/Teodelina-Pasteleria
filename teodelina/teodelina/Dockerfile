# ==========================================
# ETAPA 1: CONSTRUCCIÓN (BUILD)
# ==========================================
# Usamos una imagen oficial de Maven con Java 17 para compilar el código
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Le decimos a Docker que trabaje adentro de una carpeta llamada /app
WORKDIR /app

# Copiamos el archivo pom.xml y descargamos las dependencias primero
# (Esto hace que Docker cachee las dependencias y sea más rápido la próxima vez)
COPY pom.xml .
RUN mvn dependency:go-offline

# Ahora sí, copiamos todo el código fuente de tu pastelería
COPY src ./src

# Compilamos el proyecto y creamos el archivo ejecutable (.jar)
# Le decimos que salte los tests (-DskipTests) para que el despliegue sea más rápido
RUN mvn clean package -DskipTests

# ==========================================
# ETAPA 2: PRODUCCIÓN (RUN)
# ==========================================
# Ahora usamos una imagen de Java súper liviana (Alpine) solo para correr la app
FROM eclipse-temurin:21-jre-alpine

# Volvemos a definir el directorio de trabajo
WORKDIR /app

# Copiamos SOLAMENTE el archivo .jar que se generó en la Etapa 1
# Ignoramos todo el código fuente y las herramientas pesadas de Maven
COPY --from=build /app/target/*.jar app.jar

# Le avisamos a Docker que nuestra app de Spring Boot usa el puerto 8080
EXPOSE 8080

# El comando final que ejecuta tu aplicación cuando el contenedor se enciende
ENTRYPOINT ["java", "-jar", "app.jar"]