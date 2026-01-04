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

---

## Important routes

### API Routes
- `GET /api/healthz`  
  Health check endpoint used for deployment and automated testing.

- `POST /api/pastes`  
  Create a new paste.  
  Request body supports:
  - `content` (required)
  - `ttl_seconds` (optional)
  - `max_views` (optional)

- `GET /api/pastes/:id`  
  Fetch a paste via API.  
  Returns HTTP 404 if the paste does not exist, has expired, or has exceeded its view limit.

---

### Frontend Routes
- `GET /new`  
  Simple UI for creating a new paste and generating a shareable link.

- `GET /p/:id`  
  View a paste using its shareable URL.  
  Refreshing the page consumes a view when view limits are enabled.

---

## Technologies used

- **Node.js** – JavaScript runtime
- **Express** – Web framework for building APIs
- **PostgreSQL** – Persistent database
- **Neon** – Serverless PostgreSQL hosting
- **Prisma** – ORM for database access and migrations
- **Vanilla HTML, CSS, JavaScript** – Frontend UI
- **Vercel** – Serverless deployment platform
- **GitHub** – Version control and source hosting

---

## Deployment notes

- The application is deployed using Vercel serverless functions.
- The Express app is exported instead of using `app.listen()` to ensure compatibility with serverless execution.
- Prisma Client is generated during deployment using a `postinstall` script.
- Database connection is configured using the `DATABASE_URL` environment variable.

---

## Project status

The application is fully implemented, deployed, and meets all requirements.

