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

Install dependencies:

`npm install`

Create an environment file:

`cp .env.example .env`

Fill in the required values such as server port, database connection string, and authentication secrets.

## Running the Project

Development mode:

`npm run dev`

Production build:

`npm run build`

`npm start`

## Testing

Run tests using:

`npm test`

Tests are configured with Vitest and can be extended to cover services, controllers, and integrations.

## Environment Variables

Common environment variables include:

- PORT: Server port
- DB_URI: Database connection string
- JWT_SECRET: Authentication secret

Refer to `.env.example` for the full list.
