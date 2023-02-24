# This example requires the 'message_content' intent.
import discord
import os
from dotenv import load_dotenv
load_dotenv()
DISCORD_TOKEN = os.getenv("BOT_TOKEN")


def main():
    intents = discord.Intents.default()
    intents.message_content = True

    client = discord.Client(intents=intents)

    @client.event
    async def on_ready():
        print(f'We have logged in as {client.user}')

    @client.event
    async def on_message(message):
        if message.author == client.user:
            return

        if message.content.startswith('$hello'):
            await message.channel.send('Hello!')

    client.run(DISCORD_TOKEN)


if __name__ == "__main__":
    main()
