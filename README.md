# ManualVerification


## About
ManualVerification is a customizable self-hosted bot that provides a gateway for your Roblox based Discord server.
You can view the user's linked account and other information and choose if you want to accept/decline the verification request.


## Features
* Utilizes Discord interactions (no commands required)
* Provides detailed user information (including account age)
* Optional ban option
* Completely customizable
* Easy to setup
* Configuration error-checking


## Download

### Stable
Navigate to the [ManualVerification Releases](https://github.com/SoCuul/ManualVerification/releases/) and download the source code from the latest non pre-release version.

### Development
If you would like to test out the newest (possibly not stable) version of the bot, you can download the development version [here](https://github.com/SoCuul/ManualVerification/archive/refs/heads/main.zip).


## Pre-Setup
Make sure you have a bot application created on the [Discord Developer Portal](https://discord.com/developers/applications) and that the bot has the **Server Members Intent**.


## Main Setup

### Prerequisites
You will need to have the latest LTS version of [node.js](https://nodejs.org/en/download/). After node.js is installed, run `npm install` in the project folder.

### Configuration
**sample.env** - Rename file to `.env` and paste in a Discord bot token next to **TOKEN=**.

**sample-config.json** - Rename file to `config.json` and customize the configuration settings to your liking. Note: A colour string must be a valid HEX/Discord.JS colour.

### Startup
Run `node .` or one of the start scripts to run this bot. You can also use a process manager like [pm2](https://pm2.keymetrics.io/) to manage the bot.


## Replit Setup

### Info
Hosting with replit is an alternative method to host ManualVerification.

### Step 1: Cloning the repo
Click [this link](https://repl.it/github/socuul/manualverification) to create a new ManualVerification replit project.

### Step 2: Configuration
**ENV** - Go to the sidebar and click **Secrets**. Create a new secret with a key of `TOKEN` and a value of your Discord bot token.

**sample-config.json** - Rename file to `config.json` and customize the configuration settings to your liking. Note: A colour string must be a valid HEX/Discord.JS colour.

### Step 3: Webserver
The webserver allows the bot to stay online 24/7.
First, create a file called `modules.js`. In this file, put `module.exports = () => require('http').createServer((req, res) => res.end('ManualVerification Webserver')).listen(3000)`.

### Step 4: Pinging the webserver
Follow this guide to learn how to ping your webserver to keep your bot online 24/7.
Guide: https://replit.com/talk/learn/How-to-use-and-setup-UptimeRobot/9003

### Step 5: Installing dependencies
Run the following command in the shell section of your terminal before starting your bot for the first time to install the required backend software: `npm i --save-dev node@16`

### Step 6: Startup
You can now click the **Run** button to start up your bot. If the UptimeRobot pinging has been set-up successfully, your bot should be online 24/7.


## Contributing
Contributions to this project are gladly appreciated. 
If you would like to add something to ManualVerification, create a pull request.


## Support
If you need any help with this bot, you can join my [discord server](https://discord.com/invite/AY7WHt4Nrw).