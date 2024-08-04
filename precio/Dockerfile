FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} precio.jar
ENTRYPOINT ["java","-jar","/precio.jar"]