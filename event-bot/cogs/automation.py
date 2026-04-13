from discord.ext import commands, tasks
import requests
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class Automation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.check_events.start()

    @tasks.loop(seconds=86400)
    async def check_events(self):
        print("HIT")
        response = requests.get(
            f"http://localhost:3001/db/getall")
        hangout_info = response.json()
        channel_id = int(os.getenv("DISCORD_CHANNEL_ID", "1192285668047585300"))
        channel = self.bot.get_channel(channel_id)
        for event in hangout_info:
            date = datetime.fromisoformat(event["hangout_date"][:-1])
            difference = date - datetime.now()
            if difference.days < 3 and difference.days > 0:
                await channel.send(f"Event: {event['hangout_title']} hosted by {event['user_name']} is in {difference.days} day(s)!")

    @check_events.before_loop
    async def before_printer(self):
        print('Waiting...')
        await self.bot.wait_until_ready()

async def setup(bot):
    await bot.add_cog(Automation(bot))
