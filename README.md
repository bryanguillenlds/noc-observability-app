#NOC Project

The objective of this project is to create a Node.js-based monitoring system (NOC - Network Operations Center) that tracks critical services and sends email notifications when issues are detected. The system uses environment variables for configuration and implements a clean architecture pattern to maintain scalability and maintainability.

# dev

1. Clone .env.tamplate to your own .env
2. Config your env variables
3. Execute ``npm install`
4. Run DB with:

```
docker compose up -d
```

5. Execute `npm run dev`
