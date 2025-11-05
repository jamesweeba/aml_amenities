# AI Agent Instructions for Amenities Project

## Project Overview
This is a NestJS-based backend service that manages amenities. The project uses TypeScript and follows NestJS module-based architecture patterns.

## Key Architecture Components
- **Auth Module** (`src/auth/`): Handles authentication and authorization
- **Users Module** (`src/users/`): Manages user-related operations
- **Forms Module** (`src/forms/`): Handles form processing
- **Responses Module** (`src/responses/`): Manages form responses
- **Database**: PostgreSQL with Prisma ORM

## Development Workflow

### Setup & Installation
```bash
npm install
```

### Development Commands
- `npm run start:dev` - Run in development mode with hot reload
- `npm run build` - Build the project
- `npm run start:prod` - Run in production mode
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

### Database Management
- Prisma is configured in `prisma/schema.prisma`
- Database URL should be set in environment variable `DATABASE_URL`
- Generated Prisma client is output to `generated/prisma`

## Project Conventions
1. **Module Structure**: Each feature is organized into its own module with dedicated controller and service files
2. **Dependency Injection**: Follow NestJS DI patterns using module decorators and constructor injection
3. **Environment Variables**: Use process.env with fallback values (e.g., `process.env.PORT ?? 3000`)

## Common Patterns
- New features should be implemented as separate modules in `src/`
- Controllers handle HTTP requests and delegate business logic to services
- Services contain business logic and database operations
- Use Prisma Client for database operations

## Key Integration Points
1. Main application bootstrap in `src/main.ts`
2. Module registration in `src/app.module.ts`
3. Authentication integration in `src/auth/`
4. Database connection through Prisma client

## Common Tasks
- Adding a new module: Use NestJS CLI or follow existing module patterns
- Database schema changes: Update `prisma/schema.prisma` and run migrations
- API endpoint creation: Add controller methods with appropriate decorators
- Authentication: Integrate with `auth.module.ts` guards and decorators