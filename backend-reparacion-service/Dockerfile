FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} backend-reparacion-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/backend-reparacion-service-0.0.1-SNAPSHOT.jar"]