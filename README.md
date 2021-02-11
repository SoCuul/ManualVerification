# Roblox Manual Verification Bot
If you run a server and want a customizable manual verification bot, look no further!
This bot is easy to setup, works great on sites like repl.it and is updated frequently.

# How to download
You should always use the latest version of the bot. You can get the download the latest source code by [clicking this link](https://github.com/SoCuul/ManualVerification/releases/latest).

# Setup
## Prerequisites
First install [node.js](https://nodejs.org/en/download/) or create a new node.js project on [repl.it](https://repl.it/)
Before configuring the bot, you must install the npm packages. Download them manually, or run `npm install`.

* discord.js
* dotenv
* axios

## Configuration
### Step 1 (.env)
You must first create a file named `.env` with the following contents:
```
TOKEN=Replace this with your bot token
webhookID=Replace this with your webhook ID
webhookToken=Replace this with your webhook token
```
### Step 2 (config.json)
You must first create a file named `config.json`. This is the main way to configure the bot.
Here's how to configure it (Please replace the tutorial values with your own):
```json
{
    "prefix": "Enter the prefix that will be used for the commands",
    "botName": "Please enter the name of the bot (this will be shown in the verification embeds)",
    "guildID": "Please enter the ID of the guild that the bot will be used in",
    "staffRoleName": "Please enter the name of the role that will be able to use the commands",
    "verifiedRoleName": "Please enter the name of the role that the bot will give you when you are verified",
    "verifiedPrefix": "Please enter the prefix of the nickname to be asigned when the person is verified (Prefix | Roblox Name)",

    "statusType": "Please enter either PLAYING, WATCHING or LISTENING in all caps",
    "statusActivity": "Please enter the message to be shown after the status type",

    "verificationEmbedColor": "Please enter the color to be shown on the awaiting verification embeds (HEX or HTML colors only)",
    "acceptedVerificationEmbedColor": "Please enter the color to be shown on the accepted verification embeds (HEX or HTML colors only)",
    "declinedVerificationEmbedColor": "Please enter the color to be shown on the declined verification embeds (HEX or HTML colors only)"
}
```

## Running the bot
Run start.bat or start.sh (depending what platform you're on) and the bot should start up! (Note for using the start.sh script, before running it, do `chmod +x start.sh` and then run it with `./start.sh`)

# Commands
* `help` Shows the command list.
* `accept <message id> [notes]` Accepts a user (Optional notes).
* `decline <message id> [reason]` Declines a user (Optional reason).

# Support
If you need help with this bot, join my [support server](https://discord.gg/AY7WHt4Nrw).