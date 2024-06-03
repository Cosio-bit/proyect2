FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} backend-marca-service.jar
ENTRYPOINT ["java","-jar","/backend-marca-service.jar"]