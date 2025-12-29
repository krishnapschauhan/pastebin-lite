# Pastebin Lite

## How to run the app locally

1. Install dependencies:
   npm install

2. Set environment variables in a `.env` file:
   DATABASE_URL=<postgres_connection_string>

3. Generate Prisma client:
   npx prisma generate

4. Start the server:
   node src/app.js

The app will run at http://localhost:3000

---

## Persistence layer

The application uses PostgreSQL as the persistence layer, hosted on Neon.  
Prisma ORM is used to manage database access and schema migrations.  
No in-memory or global state is used, making the app compatible with serverless environments.

---

## Important design decisions

- The application is API-first and backend-focused, as required.
- Pastes can optionally expire based on time (TTL) or number of views.
- A paste is always visible for the current request before view count is decremented, ensuring correct user experience when limits are enabled.
- Expired, exhausted, or non-existent pastes consistently return HTTP 404.
- Deterministic time handling is supported to allow reliable automated testing.
