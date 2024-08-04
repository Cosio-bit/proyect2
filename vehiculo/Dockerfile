FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} vehiculo.jar
ENTRYPOINT ["java","-jar","/vehiculo.jar"]