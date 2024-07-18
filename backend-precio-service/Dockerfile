FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} backend-precio-service.jar
ENTRYPOINT ["java","-jar","/backend-precio-service.jar"]