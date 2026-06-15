# AssistAI --- AI Customer Support Agent

A production-ready full-stack PERN application with AI-powered customer
support, streaming responses, JWT authentication, ticket escalation, and
Swagger/OpenAPI documentation.

## Overview

AssistAI enables users to chat with an AI assistant, search FAQs,
escalate issues to human agents, and maintain conversation history.

## Quick Setup

### Prerequisites

-   Node.js 20+
-   Docker Desktop
-   PostgreSQL
-   Redis
-   Anthropic API Key

### Start Infrastructure

``` bash
docker-compose up -d
```

### Backend

``` bash
cd backend
cp .env.example .env
npm install
npm run db:push
npx tsx src/db/seed.ts
npm run dev
```

### Frontend

``` bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Swagger

Interactive documentation:

-   GET /api-docs

Includes: - OpenAPI 3.0 - Bearer JWT auth - Request/response schemas -
Examples - Interactive testing

## Environment Variables

### Backend

PORT, DATABASE_URL, REDIS_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,
ANTHROPIC_API_KEY, FRONTEND_URL

### Frontend

VITE_API_URL, VITE_SOCKET_URL

## Features

-   AI chat with tool use
-   Streaming responses
-   JWT authentication
-   Refresh token rotation
-   PostgreSQL conversation history
-   FAQ search
-   Ticket escalation
-   BullMQ background jobs
-   Redis caching
-   Swagger API docs

## API Endpoints

Authentication: - POST /api/auth/register - POST /api/auth/login - POST
/api/auth/refresh - POST /api/auth/logout - GET /api/auth/me

Conversations: - GET /api/conversations - POST /api/conversations - GET
/api/conversations/:id - DELETE /api/conversations/:id

Tickets: - GET /api/tickets - POST /api/tickets - PATCH /api/tickets/:id

FAQs: - GET /api/faqs - POST /api/faqs

## Socket Events

-   chat:message
-   chat:chunk
-   chat:done
-   chat:error
-   typing:start
-   ticket:escalated

## Health

GET /health

## Deployment

Deploy backend and frontend separately. Expose /api-docs in production.

## Useful Commands

``` bash
npm run dev
npm run build
npm run db:push
npm run db:generate
npm run db:studio
npm run preview
```
