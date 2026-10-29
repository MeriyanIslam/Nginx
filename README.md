#  Node.js, PostgreSQL & Nginx

A locally deployed backend application demonstrating essential DevOps practices, including application deployment, PostgreSQL integration, systemd service management, Nginx reverse proxy configuration, and API testing.

## Architecture

```text
             Client / Postman
                    |
                    | HTTP :80
                    v
             Nginx Reverse Proxy
                    |
                    | Proxy to 127.0.0.1:3000
                    v
              Node.js / Express
                    |
                    | PostgreSQL connection
                    v
                PostgreSQL
                 :5432
```

## Technologies Used

- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **PostgreSQL** — Relational database
- **Nginx** — Reverse proxy
- **systemd** — Application service management
- **Postman / curl** — API testing
- **Tailscale** — Private network access (optional)

## Project Structure

```text
devops-assignment/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .gitignore
└── README.md
```

> The `.env` file contains local configuration and credentials. It must not be committed to Git.

## Features

- Express.js API running on port `3000`
- PostgreSQL database connectivity
- Database health-check endpoint
- Database server-time endpoint
- systemd service for background execution
- Nginx reverse proxy on port `80`
- API testing using Postman and curl

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API status |
| GET | `/api/health` | Database connectivity check |
| GET | `/api/time` | Retrieves database server time |

### Example: Health Check

Request:

```http
GET http://localhost/api/health
```

Expected response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## Local Setup

### 1. Install dependencies

From the backend directory:

```bash
cd ~/devops-assignment/backend
npm install
```

### 2. Configure environment variables

Create or edit the `.env` file:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=devopsdb
DB_USER=devopsuser
DB_PASSWORD=YOUR_LOCAL_DATABASE_PASSWORD
```

Replace the example password with your actual local database password.

### 3. Verify PostgreSQL

```bash
sudo systemctl status postgresql
```

Test database connectivity:

```bash
psql -h 127.0.0.1 -U devopsuser -d devopsdb -W \
  -c "SELECT current_database(), current_user;"
```

### 4. Run the application

```bash
cd ~/devops-assignment/backend
node server.js
```

Test the backend directly:

```bash
curl http://127.0.0.1:3000/
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3000/api/time
```

## systemd Service

The application is configured to run as a systemd service.

Check its status:

```bash
sudo systemctl status devops-assignment --no-pager
```

Enable the service at startup:

```bash
sudo systemctl enable devops-assignment
```

Restart the application:

```bash
sudo systemctl restart devops-assignment
```

View application logs:

```bash
sudo journalctl -u devops-assignment -n 50 --no-pager
```

## Nginx Reverse Proxy

Nginx accepts HTTP requests on port `80` and forwards them to the Express application at `127.0.0.1:3000`.

Validate the configuration:

```bash
sudo nginx -t
```

Reload Nginx:

```bash
sudo systemctl reload nginx
```

Test the application through Nginx:

```bash
curl -i http://localhost/
curl -i http://localhost/api/health
curl -i http://localhost/api/time
```

## API Testing with Postman

Use the GET method to test these URLs:

- `http://localhost/`
- `http://localhost/api/health`
- `http://localhost/api/time`

Verify the HTTP status code and response body for each endpoint.

## Security Considerations

- Keep database credentials in `.env`.
- Never commit `.env` or other secrets to Git.
- Keep PostgreSQL accessible only where required.
- Do not expose the database port publicly.
- Use HTTPS and appropriate firewall rules for a production deployment.
- Restrict remote access to trusted devices and networks.

## Deployment Scope

This project was implemented and tested in a local Manjaro Linux environment.

A remote Ubuntu server or AWS EC2 deployment, if required by the assignment, is a separate deployment step.

## Author

**S. M. Meriyan Islam**

DevOps | Linux | Docker | Nginx | PostgreSQL | CI/CD

GitHub: https://github.com/MeriyanIslam
