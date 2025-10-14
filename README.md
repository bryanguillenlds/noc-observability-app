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
