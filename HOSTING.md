# Hosting Guide

This guide covers three ways to host raidPlanners: managed cloud services (easiest), Docker Compose on a single server, and full AWS deployment using the included Terraform and Ansible configs.

---

## Before You Start

Regardless of which hosting path you choose, complete these steps first.

### 1. Create a Discord OAuth application

Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.

- Under **OAuth2 → General**, copy your **Client ID** and **Client Secret**
- Add a redirect URL matching your deployment (e.g. `https://yourdomain.com/auth/discord/callback`)
- Under **Bot**, create a bot and copy the **Bot Token** (used by the Discord bot in `event-bot/`)

### 2. Update hardcoded frontend URLs

Every `axios` call in the frontend currently points to `http://localhost:3001`. Before deploying, replace these with an environment variable.

In each frontend component, replace:
```js
axios.post("http://localhost:3001/...")
```
with:
```js
axios.post(`${import.meta.env.VITE_API_URL}/...`)
```

Then create `raid-frontend/.env`:
```env
VITE_API_URL=https://your-backend-domain
```

### 3. Update CORS in the backend

In `raid-backend/app.js`, update the CORS origin from `http://localhost:5173` to your real frontend URL:
```js
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
```

Add `CORS_ORIGIN=https://your-frontend-domain` to your backend `.env`.

---

## Option A — Managed Cloud Services (Recommended for Small Projects)

No server management. Free tiers available on all services listed.

| Component | Service |
|---|---|
| React frontend | [Vercel](https://vercel.com) or [Netlify](https://netlify.com) |
| Express backend | [Railway](https://railway.app) or [Render](https://render.com) |
| MySQL database | Railway MySQL or [PlanetScale](https://planetscale.com) |
| Discord bot | Railway or [Fly.io](https://fly.io) (needs to stay running 24/7) |

### Deploy the frontend (Vercel)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Set the root directory to `raid-frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend-url`
5. Deploy — Vercel auto-deploys on every push to `main`

### Deploy the backend (Railway)

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
2. Select your repo, set root directory to `raid-backend`
3. Add a MySQL database service in the same Railway project
4. Add environment variables in the Railway dashboard:

```env
SESSION_SECRET=your_long_random_string
CLIENT_ID=your_discord_client_id
TOKEN_SECRET=your_discord_client_secret
CALLBACK_URL=https://your-backend-url/auth/discord/callback
CORS_ORIGIN=https://your-frontend-url
DB_HOST=<railway_mysql_host>
DB_USER=<railway_mysql_user>
DB_PASSWORD=<railway_mysql_password>
DB_NAME=<railway_mysql_db_name>
```

Railway injects MySQL connection details automatically if you link the MySQL service to your backend service.

### Deploy the Discord bot (Railway)

1. In the same Railway project, add another service from your repo
2. Set root directory to `event-bot`
3. Set the start command to `python app.py`
4. Add environment variables:

```env
TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_channel_id
```

---

## Option B — Docker Compose on a Single Server

Use this if you want everything on one machine. The `docker-compose.yml` in the project root is already configured for this.

### Step 1 — Provision a server

You can use any Linux VPS. Common options:
- [DigitalOcean Droplet](https://digitalocean.com) — $4–6/month
- [Hetzner Cloud](https://hetzner.com/cloud) — cheaper than AWS for small servers
- AWS EC2 (see Option C below for automated provisioning)

Minimum spec: **1 vCPU, 1 GB RAM** (t2.micro / Hetzner CX11)

### Step 2 — Open required ports

In your server's firewall or security group, open:

| Port | Purpose |
|---|---|
| 22 | SSH |
| 80 | HTTP (Nginx, if used) |
| 443 | HTTPS (Nginx + SSL) |
| 3001 | Express backend (or proxy via Nginx) |
| 5173 | React frontend dev server |

### Step 3 — SSH in and install Docker

```bash
ssh ubuntu@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### Step 4 — Clone the repo and configure

```bash
git clone https://github.com/your-username/raidPlanners.git
cd raidPlanners
```

Create `raid-backend/.env`:
```env
SESSION_SECRET=your_long_random_string
CLIENT_ID=your_discord_client_id
TOKEN_SECRET=your_discord_client_secret
CALLBACK_URL=http://your-server-ip:3001/auth/discord/callback
CORS_ORIGIN=http://your-server-ip:5173
DB_HOST=10.5.0.7
DB_USER=raid-user
DB_PASSWORD=raiduser-0000
DB_NAME=raid
```

Create `event-bot/.env`:
```env
TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_channel_id
```

### Step 5 — Run

```bash
docker compose up -d
```

Check logs:
```bash
docker compose logs -f
```

Stop:
```bash
docker compose down
```

> **Note:** The Discord bot is not included in `docker-compose.yml`. To run it alongside the app, either add it as a service or run it separately with `python app.py` in a `screen` or `tmux` session.

---

## Option C — AWS with Terraform and Ansible (Included in Repo)

The `raid-infrastructure/` directory contains Terraform configs to provision AWS infrastructure and Ansible for configuration management.

### Prerequisites

- [Terraform CLI](https://developer.hashicorp.com/terraform/install) installed
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured (`aws configure`)
- An SSH key pair at `~/.ssh/aws-server` (private) and `~/.ssh/aws-server.pub` (public)

Generate a key pair if you don't have one:
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/aws-server
```

### Step 1 — Provision with Terraform

```bash
cd raid-infrastructure/aws-infrastructure/terraform

terraform init
terraform plan
terraform apply
```

This creates:
- A VPC with a public subnet in `us-west-2a`
- A `t2.micro` Ubuntu 22.04 EC2 instance
- A security group (SSH + HTTP)
- An Elastic IP (static public IP)

After `apply` completes, Terraform prints your server's public IP:
```
public_ip = {
  "aws" = "203.0.113.42"
}
```

### Step 2 — Open additional ports

The current security group in `networking.tf` only opens ports 22 and 80. You need to add 3001 and 5173 (or set up Nginx to proxy both through port 80). Edit `networking.tf` to add:

```hcl
ingress {
  from_port   = 3001
  to_port     = 3001
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

ingress {
  from_port   = 5173
  to_port     = 5173
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}
```

Then run `terraform apply` again.

### Step 3 — Configure with Ansible

The Ansible inventory uses the `aws_ec2` plugin to dynamically discover your EC2 instances by tag.

Fix the private key path in `hosts_aws_ec2.yml` — it currently points to the public key by mistake. Change:
```yaml
ansible_ssh_private_key_file: ~/.ssh/aws-server.pub
```
to:
```yaml
ansible_ssh_private_key_file: ~/.ssh/aws-server
```

Install the required Ansible collection:
```bash
ansible-galaxy collection install amazon.aws
```

Run your playbook (add your own playbook to install Docker and deploy the app):
```bash
cd raid-infrastructure/aws-infrastructure/ansible
ansible-playbook -i inventory your-playbook.yml
```

### Step 4 — Deploy

SSH into your EC2 instance and follow the same Docker Compose steps from Option B (Steps 3–5), using the Elastic IP output by Terraform as your server IP.

---

## Environment Variables Reference

### Backend (`raid-backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `SESSION_SECRET` | Secret for signing session cookies | `a_long_random_string` |
| `CLIENT_ID` | Discord OAuth client ID | from Discord Developer Portal |
| `TOKEN_SECRET` | Discord OAuth client secret | from Discord Developer Portal |
| `CALLBACK_URL` | Discord OAuth redirect URL | `https://yourdomain.com/auth/discord/callback` |
| `CORS_ORIGIN` | Allowed frontend origin | `https://your-frontend.vercel.app` |
| `DB_HOST` | MySQL host | `localhost` or Railway host |
| `DB_USER` | MySQL username | `raid-user` |
| `DB_PASSWORD` | MySQL password | `your_password` |
| `DB_NAME` | MySQL database name | `raid` |
| `PORT` | Express server port (optional) | `3001` |

### Discord Bot (`event-bot/.env`)

| Variable | Description | Example |
|---|---|---|
| `TOKEN` | Discord bot token | from Discord Developer Portal |
| `DISCORD_CHANNEL_ID` | Channel ID for event reminders | `1192285668047585300` |

### Frontend (`raid-frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the Express backend | `https://your-backend.railway.app` |
