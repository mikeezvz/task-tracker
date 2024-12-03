FROM node:18 AS backend-build
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install
COPY backend/ .

FROM node:18 AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM node:18
WORKDIR /app

COPY --from=backend-build /app/backend /app/backend
COPY --from=frontend-build /app/frontend/build /app/backend/public

ENV PORT=5000

WORKDIR /app/backend
RUN npm install --production

EXPOSE 5000

CMD ["npm", "start"]
