FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Builda o frontend
RUN npm run build
EXPOSE 5173

# Roda o frontend
CMD ["npm", "run", "preview", "--", "--host"]