FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} marca.jar
ENTRYPOINT ["java","-jar","/marca.jar"]