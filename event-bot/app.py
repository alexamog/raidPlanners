import os
import discord
from dotenv import load_dotenv
from discord.ext import commands

import asyncio

load_dotenv()
TOKEN = "ODEwMDA1MTg1NDg1MjA5NjAw.GgeLnA.OI7ksQIQldFMne2kK8beFmU5XxSHFuLi1rnPzM"
bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())


@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Activity(name='RaidPlanners', type=0))
    print(discord.__version__)
    print(f"{bot.user.name} - {bot.user.id}")
    print('Up and running')


async def load_extensions():
    await bot.load_extension(f"cogs.commands")
    await bot.load_extension(f"cogs.automation")


async def main():
    async with bot:
        await load_extensions()
        await bot.start(TOKEN)

asyncio.run(main())
