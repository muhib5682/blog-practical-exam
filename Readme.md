# YegnaBlog – Fullstack Blog System

# System Features

|--- User Authentication (Register / Login)
|--- Create, Read, Update, Delete Blog Posts(CRUD Operation)
|--- Comment on Posts
|--- Filter All Posts
|--- Modern UI with TailwindCSS
|--- CQRS & Repository Pattern
|--- Dark Mode UI
|--- Secure Input Validation

# Technologies Used

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React, Tailwind CSS   |
| Backend  | NestJS, TypeORM, CQRS |
| Database | MySQL                 |

# Backend Folder Structure

src/
|\_\_ config/ # database connection
├── core/
│ └── entities/ # entities (User, Post, Comment)
├── modules/
│ ├── auth/ # Auth module
│ ├── posts/ # Post module
│ └── comments/ # Comment module
|  
main.ts # App entry point

## Setup Instructions

### Backend

1. Install deps: `npm install`
2. Configure `.env`
3. Run: `npm run start:dev`

### Frontend

1. Install deps: `npm install`
2. Run: `npm run dev`

---

## Contact

Submitted by: Mohabaw Gumataw (mohabawgumataw@gmail.com)
