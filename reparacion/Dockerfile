FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} reparacion.jar
ENTRYPOINT ["java","-jar","/reparacion.jar"]