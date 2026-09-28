FROM eclipse-temurin:25-jdk
WORKDIR /app
COPY . .

# Builda o backend
RUN ./gradlew build -x test
EXPOSE 8080

# Roda o jar que gerou
CMD ["sh", "-c", "java -jar build/libs/*.jar"]