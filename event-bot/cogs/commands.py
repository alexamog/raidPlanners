from discord.ext import commands
import requests
import logging
import logging.config


class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='schedule')
    async def check_schedule(self, ctx):
        """
        Function to retrieve schedule
        """
        user_id = ctx.message.author.id
        logger.info(f"COMMANDS::schedule called by {user_id}")
        response = requests.get(
            f"http://localhost:3001/discord/getCards/{user_id}")
        hangout_info = response.json()
        print(ctx.channel.id)
        if len(hangout_info) != 0:
            for data in hangout_info:
                await ctx.send(
                    f"Hangout: {data['hangout_title']}\n Creator: {data['user_name']}\n Location: {data['hangout_location']}\n Date: {data['hangout_date']}\n============================")
        else:
            await ctx.send(f"You haven't joined any hangouts yet.")

    @commands.command(name='events')
    async def get_events(self,ctx):
        response = requests.get(f"http://localhost:3001/db/getall")
        print(response)
        hangout_info = response.json()
        print(hangout_info)
        if len(hangout_info) != 0:
            for data in hangout_info:
                await ctx.send(
                    f"Hangout: {data['hangout_title']}\n Creator: {data['user_name']}\n Location: {data['hangout_location']}\n Date: {data['hangout_date']}\n============================")


logger = logging.getLogger('basic')

async def setup(bot):
    await bot.add_cog(Commands(bot))
