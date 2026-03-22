# Discussed

Discussed is a discussion platform designed to support structured conversations and community-driven interactions. The project focuses on clean backend architecture, scalability, and maintainability while providing a solid foundation for building forums, comment systems, or discussion-based applications.

## Tech Stack

Backend:

- Node.js
- REST API
- Web Socket

Frontend:

- React
- TypeScript
- Vite
- Vitest

## Installation

Clone the repository:

`git clone https://github.com/dogukanarslan/discussed.git`

`cd discussed`

Install backend dependencies:

`cd backend && npm install`

Install frontend dependencies:

`cd ui && npm install`

Create the backend environment file:

`cp backend/.env.example backend/.env`

Create the frontend environment file:

`cp ui/.env.example ui/.env`

Fill in the required values such as server port, database connection string, authentication secrets, and frontend API URL.

## Running the Project

Frontend development mode:

`cd ui && npm run dev`

Backend development mode:

`cd backend && npm run dev`

Frontend production build:

`cd ui && npm run build`

Backend production start:

`cd backend && npm run start`

## Testing

Run frontend tests using:

`cd ui && npm run test`

Tests are configured with Vitest and can be extended to cover services, controllers, and integrations.

## Environment Variables

Common environment variables include:

- PORT: Server port
- DB: SQLite database path
- JWT_SECRET: Authentication secret
- VITE_BASE_URL: Frontend API base URL

Refer to `backend/.env.example` and `ui/.env.example` for the full list.
