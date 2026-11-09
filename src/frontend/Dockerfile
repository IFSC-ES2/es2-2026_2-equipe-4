FROM node:24-alpine
WORKDIR /app
ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY package*.json ./
RUN npm ci
COPY . .

# Builda o frontend
RUN npm run build
EXPOSE 5173

# Roda o frontend
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
