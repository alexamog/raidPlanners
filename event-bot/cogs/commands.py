from discord.ext import commands
import requests


class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='schedule')
    async def check_schedule(self, ctx):
        """
        Function to retrieve schedule
        """
        user_id = ctx.message.author.id
        response = requests.get(
            f"http://localhost:3001/discord/getCards/{user_id}")

        hangout_info = response.json()
        if len(hangout_info) != 0:
            for data in hangout_info:
                await ctx.send(
                    f"Hangout: {data['hangout_title']}\n Creator: {data['user_name']}\n Location: {data['hangout_location']}\n Date: {data['hangout_date']}\n============================")
        else:
            await ctx.send(f"You haven't joined any hangouts yet.")


async def setup(bot):
    await bot.add_cog(Commands(bot))
