# Task List

A small task management app: view, add, edit, delete, filter, and search tasks, with a dedicated detail page per task.

## Tech stack

- **Nuxt 4** (Vue 3 + Composition API, `<script setup>`)
- **Pinia** for state management (setup-store style)
- **Tailwind CSS** for styling
- **TypeScript** throughout (app, server, and shared code)
- **Vitest** for unit tests

## Features

- Task list with title, description, status (`Pending` / `In Progress` / `Done`), and due date
- Add task form with validation (title required, due date required and must be in the future)
- Edit and delete existing tasks, from both the list and the task detail page
- Filter by status and search by title
- Dedicated task detail page (`/tasks/:id`) via Nuxt's file-based router
- Mock REST API (`/api/tasks`) with an artificial network delay, backed by an in-memory store
- Loading (skeleton), error (with retry), and empty states throughout

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000). Data is seeded in memory on server start and resets whenever the dev server restarts (it's a mock API, not a real database).

## Other scripts

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run generate  # static site generation
npm run test      # run the Vitest suite once
npm run test:watch # run Vitest in watch mode
```

## Project structure

```
app/
  components/
    base/     # generic UI primitives (BaseButton, BaseInput, BaseSelect, BaseTextarea, BaseModal, LoadingState, ErrorState)
    tasks/    # task-domain components (TaskCard, TaskList, TaskFilters, TaskForm, TaskStatusBadge)
  pages/      # file-based routes: "/" (list) and "/tasks/[id]" (detail)
  stores/     # Pinia store for tasks (fetch, add, edit, delete, filter, search)
server/
  api/tasks/  # mock REST endpoints (GET/POST/PUT/DELETE)
  utils/      # in-memory task store + simulated network delay
shared/
  types/      # Task, TaskInput, TaskStatus, etc. (shared between app and server)
  utils/      # validateTask (form validation) and filterTasks (status/search filtering)
tests/        # Vitest unit tests for the shared validation and filtering logic
```
