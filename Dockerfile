FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

ARG VITE_API_URL
ARG VITE_SOCKET_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
FROM node:20-alpine AS backend-build

WORKDIR /app/backend
COPY server/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build
FROM node:20-alpine AS complete
WORKDIR /app
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package*.json ./server/
COPY --from=frontend-build /app/frontend/dist ./backend/dist/public
ENV NODE_ENV=production
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "dist/index.js"]