# raidPlanners
A web application designed to help friends coordinate plans/events 

# Getting Started

## Creating the Discord OAuth application
A Discord Bot  is needed for the Discord login strategy to work
With your own Discord account, create a [Discord OAuth application](https://discord.com/developers/docs/intro)

In the settings of your Discord bot, under OAuth2, set a redirect to the callback URL (http://localhost:3001/auth/discord/callback)

Finally, add the discord bot info inside the .env located in the raid-backend folder. 

You may now run both the front-end and back-end. 

## Running the application
cd into both directories and enter: 
`npm run dev`

Doing this will either startup the front-end or back-end server.

# Future implementation

In the upcoming future we plan on implementing Docker for easy startup. Additionally, we also 
plan on implementing a Discord bot to remind users through Discord what events are coming up. 
