# raidPlanners

A full-stack event scheduling platform for coordinating plans with friends, featuring Discord OAuth login and an integrated Discord bot for automated reminders.

---

## Tech Stack

- **Frontend** — React
- **Backend** — Node.js, Express, session-based auth middleware
- **Auth** — Discord OAuth via Passport.js
- **Database** — MySQL
- **Bot** — Discord.py with two cogs: a daily polling loop for event reminders and a command handler for querying personal schedules
- **Infrastructure** — Multi-container Docker Compose with custom bridge network, static IP assignments, and MySQL health checks
- **Deployment** — AWS EC2 via Ansible

---

## Getting Started

### 1. Create a Discord OAuth application

Create a [Discord OAuth application](https://discord.com/developers/docs/intro) in the Discord developer portal.

Under **OAuth2**, add the following redirect URL:
```
http://localhost:3001/auth/discord/callback
```

### 2. Configure environment variables

Create a `.env` file in the `raid-backend` folder:
```env
CLIENT_ID=
TOKEN_SECRET=
CALLBACK_URL=http://localhost:3001/auth/discord/callback
```

Fill in `CLIENT_ID` and `TOKEN_SECRET` with your bot's credentials from the Discord developer portal.

### 3. Run with Docker

If Docker is not installed, follow the [installation guide](https://docs.docker.com/get-started/).

From the project root:
```bash
docker-compose up
```

To stop:
```bash
docker-compose down
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

---

## Discord Bot

The bot runs alongside the application and provides two features:

- **Reminders** — a daily polling loop checks the API and sends a channel message 72 hours before any upcoming event
- **Schedule queries** — users can query their personal upcoming events directly via a bot command in Discord
