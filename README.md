# raidPlanners
A web application designed to help friends coordinate plans and events.

# Getting Started

## Creating the .env file in raid-backend

Create a .env file and paste in the following:

`CLIENT_ID= TOKEN_SECRET= CALLBACK_URL=http://localhost:3001/auth/discord/callback`

## Creating the Discord OAuth application
A Discord bot is required for the Discord login strategy to work.  
Using your own Discord account, create a [Discord OAuth application](https://discord.com/developers/docs/intro).  

In your bot’s settings, under OAuth2, set a redirect to the callback URL:  
`http://localhost:3001/auth/discord/callback`

Finally, add the bot’s information to the .env file in the raid-backend folder.  

You can now run both the front end and back end.  

## Setting up Docker and running the application
This project uses Docker to containerize microservices. If Docker is not installed, follow the instructions [here](https://docs.docker.com/get-started/).  

Once Docker is installed, navigate to the project's parent directory and run:  
`docker-compose up`

This starts both the front-end and back-end servers.  

To stop the application, enter:  
`docker-compose down`

# Future Implementation

We plan to add a Discord bot that reminds users about events. It will notify them of upcoming, edited, or deleted events.
