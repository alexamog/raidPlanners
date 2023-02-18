# raidPlanners
A web application designed to help friends coordinate plans/events 

# Getting Started

## Creating the .env file in raid-backend

Create a .env file and paste in the following:

`CLIENT_ID= TOKEN_SECRET= CALLBACK_URL=http://localhost:3001/auth/discord/callback`

## Creating the Discord OAuth application
A Discord Bot  is needed for the Discord login strategy to work
With your own Discord account, create a [Discord OAuth application](https://discord.com/developers/docs/intro)

In the settings of your Discord bot, under OAuth2, set a redirect to the callback URL (http://localhost:3001/auth/discord/callback)

Finally, add the discord bot info inside the .env located in the raid-backend folder. 

You may now run both the front-end and back-end. 

## Setting up Docker and running the application
In this project, we utilize Docker to containerize the microservices. If you do not have Docker installed on your system, please follow the instructions provided [here](https://docs.docker.com/get-started/)

Once Docker is successfully installed, navigate to the parent project directory and execute the following command:
`docker-compose up`

Doing this will startup both the front-end and back-end server.

When you're finished running the application, simply enter `docker-compose down` to shutdown the containers.

# Future implementation

In the upcoming future we plan on implementing a Discord bot to remind users through Discord what events are coming up. 
