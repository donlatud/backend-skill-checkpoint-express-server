# Questions & Answers API

A REST API backend for managing questions and answers. Users can create, read, update, and delete questions; add and view answers; search by title or category; and vote on questions and answers.

## Description

This project is an Express.js server that provides CRUD operations for questions and answers, with PostgreSQL as the database. It demonstrates a layered structure (routes → controller → service → repository) and includes validation middleware and error handling.

**What it does:**

- Manage questions with title, description, and category (e.g. Software, Food, Travel, Science).
- Add answers to questions (max 300 characters).
- Search questions by title or category.
- **Vote (เห็นด้วย/ไม่เห็นด้วย)** on questions and on answers: send `{ "vote": 1 }` (เห็นด้วย) or `{ "vote": -1 }` (ไม่เห็นด้วย). The total vote count can be positive or negative and is returned as `vote_count` when you get questions or answers.
- Deleting a question also removes all its answers.

**Tech stack:** Node.js, Express, PostgreSQL (with `pg`), dotenv.

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment](#environment)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository and go to the project folder:

   ```bash
   cd backend-skill-checkpoint-express-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure PostgreSQL is running and create a database. Then set the connection string in a `.env` file (see [Environment](#environment)).

## Running the Project

Start the server (with nodemon for development):

```bash
npm start
```

The server runs at `http://localhost:4000` by default.

## Environment

Create a `.env` file in the project root with your PostgreSQL connection string, for example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
```

The app uses this in `utils/db.mjs` to connect to the database. You need at least:

- **questions** table: `id`, `title`, `description`, `category` (and any timestamps you use).
- **answers** table: `id`, `question_id`, `content` (and any timestamps).
- **question_votes** table: `question_id`, `vote` (1 or -1).
- **answer_votes** table: `answer_id`, `vote` (1 or -1).

## API Endpoints

Base URL: `http://localhost:4000`

### Questions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/questions` | Create a question. Body: `{ "title", "description", "category" }`. |
| GET | `/questions` | Get all questions (each includes `vote_count`: sum of votes, + or -). |
| GET | `/questions/search?title=...&category=...` | Search by title and/or category (at least one required; results include `vote_count`). |
| GET | `/questions/:questionId` | Get one question by ID (includes `vote_count`). |
| PUT | `/questions/:questionId` | Update a question. Body: `{ "title", "description", "category" }`. |
| DELETE | `/questions/:questionId` | Delete a question (and all its answers). |
| POST | `/questions/:questionId/vote` | Vote on a question. Body: `{ "vote": 1 }` or `{ "vote": -1 }`. |

### Answers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/questions/:questionId/answers` | Add an answer. Body: `{ "content": "..." }` (max 300 characters). |
| GET | `/questions/:questionId/answers` | Get all answers for a question (each includes `vote_count`: + or -). |
| DELETE | `/questions/:questionId/answers` | Delete all answers for that question. |
| POST | `/answers/:answerId/vote` | Vote on an answer. Body: `{ "vote": 1 }` or `{ "vote": -1 }`. |

### Example requests

**Create a question:**

```json
POST /questions
{ "title": "What is Express?", "description": "I want to learn Express.", "category": "Software" }
```

**Create an answer:**

```json
POST /questions/1/answers
{ "content": "Express is a minimal web framework for Node.js." }
```

**Search questions:**

```
GET /questions/search?category=Software
GET /questions/search?title=Express
```

## Project Structure

```
├── app.mjs                 # Express app and route mounting
├── controller/             # Request/response handling
├── middleware/             # Validation (body, params, search)
├── service/               # Business logic
├── repositories/          # Database access (questions, answers)
├── routes/                # Route definitions (questions, answers)
└── utils/
    └── db.mjs             # PostgreSQL pool
```

## Requirements Checklist

- [x] 1. Create questions (title, description, category).
- [x] 2. View all questions.
- [x] 3. View a single question by ID.
- [x] 4. Edit question title or description (via PUT with full body).
- [x] 5. Delete a question.
- [x] 6. Search questions by title or category.
- [x] 7. Create an answer (content, max 300 characters).
- [x] 8. View answers for a question.
- [x] 9. Deleting a question also deletes all its answers.
- [x] 10. README with project description and usage.

## License

ISC
