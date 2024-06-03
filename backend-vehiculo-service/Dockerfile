FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} backend-vehiculo-service.jar
ENTRYPOINT ["java","-jar","/backend-vehiculo-service.jar"]