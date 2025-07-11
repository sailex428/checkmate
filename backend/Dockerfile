FROM openjdk:21-oracle
LABEL authors="sailex"
ENV TZ=Europe/Berlin

WORKDIR /backend

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} checkmate.jar

CMD ["java", "-jar", "checkmate.jar"]
