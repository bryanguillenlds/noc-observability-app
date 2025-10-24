#NOC Project

The objective of this project is to create a Node.js-based monitoring system (NOC - Network Operations Center) that tracks critical services and sends email notifications when issues are detected. The system uses environment variables for configuration and implements a clean architecture pattern to maintain scalability and maintainability.

# dev

## Setup Instructions

1. Clone .env.template to your own .env
2. Config your env variables
3. Execute `npm install`
4. Run DB with:

```
docker compose up -d
```

This starts PostgreSQL and MongoDB containers locally on your machine.

5. Run Prisma migrations to create database tables:

```
npx prisma migrate dev
```

This creates the database tables in your local PostgreSQL instance based on the schema defined in `prisma/schema.prisma`. Note: This command also automatically generates the Prisma Client.

6. Execute `npm run dev`

## Testing

Run tests with isolated test databases:

```bash
npm test
```

## Additional Prisma Commands

- **Generate Prisma Client** (if you pull schema changes from Git):

  ```
  npx prisma generate
  ```

- **View your database** in Prisma Studio:
  ```
  npx prisma studio
  ```

## Note on Migrations

Each developer creates their own local database using the same migration files tracked in Git. The migrations ensure everyone has the same database structure for development. The generated Prisma Client (`src/generated/prisma/`) is excluded from Git and generated locally on each machine.

## Project Overview

### Purpose

NOC-App is a **Network Operations Center monitoring system** that continuously monitors service endpoints and logs their status. It performs scheduled health checks against configured URLs, records results across multiple data stores, and can send email notifications when issues are detected. This project demonstrates building a monitoring service with clean architecture principles and multi-database persistence.

### Context

This application provides automated health checks that run on configurable schedules, categorize issues by severity (LOW, MEDIUM, HIGH), and maintain persistent logs for analysis. Instead of manual checks or relying solely on user reports, the system proactively detects service failures.

### Current State

The project is functional for local development. The main server runs continuous health checks against configured URLs and logs to the selected datasource(s). Email notifications are implemented but currently disabled in the code. It's set up to demonstrate clean architecture patterns and multi-database integration rather than being production-ready.

### Architecture

The project follows **Clean Architecture** to separate business logic from infrastructure concerns:

**Domain Layer**

- `LogEntity`: Represents a log entry with message, severity level, origin, and timestamp
- Use case classes: `CheckService` and `CheckServiceMultiple` handle the health check logic
- Repository abstractions define data persistence contracts

**Infrastructure Layer**

- Three datasource implementations: filesystem, MongoDB, and PostgreSQL
- Repository implementations that adapt each datasource to the domain interface
- The system can log to one datasource or all three simultaneously

**Presentation Layer**

- Server bootstrapping and dependency injection
- Cron-based job scheduling for periodic health checks
- Email service for notifications (currently commented out)

This separation means you can swap datasources or add new ones without changing the health check logic.

### Technical Implementation

**Runtime & Language:**

- Node.js with TypeScript for type safety

**Data Persistence:**

- PostgreSQL with Prisma ORM (type-safe queries and schema migrations)
- MongoDB with Mongoose (flexible document storage)
- File system logging (simple text-based logs)

**Key Libraries:**

- `cron`: Job scheduling with cron expressions
- `nodemailer`: Email notifications
- `env-var`: Validated environment variable configuration

**Development:**

- Docker Compose for local database setup
- ts-node-dev for development hot-reloading

**Testing:**

- Jest with TypeScript for unit and integration testing
- 96%+ code coverage with isolated test databases
- Clean architecture testing: each layer tested independently (domain entities, use cases, repositories)
- Real database integration tests with proper cleanup between tests
- Mocked external dependencies (email service) to ensure test reliability

### Implementation Notes

**Multi-Datasource Pattern:** The `CheckServiceMultiple` use case writes to all three datasources simultaneously. This demonstrates the repository pattern's flexibility but isn't necessarily a production recommendation - writing to three databases on every health check has performance implications.

**Type Mapping:** Converting between Prisma's generated enums and domain entities required explicit mapping functions. This is a common pattern when using ORMs with domain-driven design.

**Clean Architecture Trade-offs:** The layered approach adds abstraction overhead for a relatively simple application. The benefit is that adding a new datasource only requires creating a new datasource implementation with no need for changes to use cases or entities.

**Cron Scheduling:** Currently runs health checks every 5 seconds (`*/5 * * * * *`). This is fine for development but would be adjusted for production based on actual SLA requirements.

### What I Learned

- Clean architecture creates clear boundaries, but you pay for it in boilerplate. For this scope, it might be over-engineered, but it demonstrates the pattern well.
- Prisma's migration system is solid for development - everyone gets the same schema from version control.
- Managing multiple database connections requires careful initialization sequencing (MongoDB connects explicitly; Prisma connects lazily).
- TypeScript catches type mismatches between database schemas and domain entities at compile time, improving Developer Experience and saving debugging time.
- Implementing the same interface three different ways (file, Mongo, Postgres) revealed subtle differences in how each storage mechanism handles timestamps and serialization.
