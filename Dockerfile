# ---- Stage 1: Build with Maven ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first (cached layer)
RUN mvn dependency:resolve
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Stage 2: Deploy to Tomcat ----
FROM tomcat:10.1-jdk17-temurin-jammy
# Remove default webapps
RUN rm -rf /usr/local/tomcat/webapps/*
# Copy the WAR as ROOT.war so it serves at /
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/ROOT.war

# Render sets PORT env var; configure Tomcat to use it
# Default to 8080 if PORT is not set
ENV PORT=8080
RUN sed -i 's/<Server port="8005"/<Server port="-1"/' /usr/local/tomcat/conf/server.xml

CMD ["/bin/sh", "-c", "sed -i \"s/port=\\\"8080\\\"/port=\\\"$PORT\\\"/g\" /usr/local/tomcat/conf/server.xml && catalina.sh run"]
