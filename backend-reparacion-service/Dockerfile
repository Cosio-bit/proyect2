FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} backend-reparacion-service.jar
ENTRYPOINT ["java","-jar","/backend-reparacion-service.jar"]