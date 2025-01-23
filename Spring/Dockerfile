FROM openjdk:17-jdk-slim

WORKDIR /app

COPY build/libs/*.jar app.jar

ENV SERVER_NAME=subee.world
ENV VIRTUAL_HOST=subee.world,www.subee.world

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"] 