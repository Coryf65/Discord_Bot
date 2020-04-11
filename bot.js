const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./config.json');

// about to add some more mix
//https://anidiots.guide/first-bot/adding-a-config-file
//const Discord = require("discord.js");
//const client = new Discord.Client();
//const config = require("./config.json");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true
});


logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
   token: auth.token,
   autorun: true
});


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `/`
    if (message.substring(0, 1) == '/') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            // Delete
                case 'clean':
                if(!args[0]) return message.channel.send("oof");
                    message.channel.bulkDelete(args[0]).then(() => {
                    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
                });
            break;
            // Just add any case commands if you want to..
        }
    }
});