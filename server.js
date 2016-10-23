const Discord = require('discord.js');
const yt = require('ytdl-core');
const colors = require('colors');
const search = require('youtube-search');

const bot = new Discord.Client();
const token = 'YOUR TOKEN DISCORD';
var tab = [];
var i = 0;
const prefix = ".";

colors.setTheme({
  custom: ['red', 'underline']
});

var opts = {
  maxResults: 3,
  key: 'YOUR TOKEN YOUTUBE'
};

function music(voiceChannel, i)
{
        voiceChannel.join().then(connection => {
            let stream = yt(tab[i], {audioonly: true});
            const streamoptions = { seek: 0,volume: 0.05 };
            const dispatcher = connection.playStream(stream, streamoptions);
            dispatcher.on("end", () => {
                if (i < tab.length) i++;
                if (i >= tab.length) i = 0;
                return music(voiceChannel, i);
            });
        });
}

bot.on('ready', () => {
  console.log("I am ready!".custom);
});

bot.on('message', message => {
    const voiceChannel = message.member.voiceChannel;

    if (message.content.startsWith(prefix + "play")) {
        message.delete(message.author);
        if (!voiceChannel) return message.reply("You need to connect a voice channel");
        if (tab[0] == null) return message.reply('No music, please add.');
        else music(voiceChannel, i);
    }

    else if (message.content.startsWith(prefix + "stop")) {
        message.delete(message.author);
        voiceChannel.leave();
        music(voiceChannel, i);
    }
/*
    else if (message.content.startsWith(prefix + "next")) {
        message.delete(message.author);
        if (i < tab.length) i++;
        if (i >= tab.length) i = 0;
        voiceChannel.leave();
        music(voiceChannel, i);
    }
*/
    else if (message.content.startsWith(prefix + "add")) {
        message.delete(message.author);
        var link = message.content.split(' ');
        link.shift();
        link = link.join(' ');
        search(link, opts, function(err, results) {
            if(err) return console.log(err);
            for (var y = 0; results[y].kind == 'youtube#channel'; y++);
            message.channel.sendMessage(results[y].link);
            tab[tab.length] = (results[y].link);
        });
    }

    else if (message.content.startsWith(prefix + "clear")) {
        message.delete(message.author);
        tab = [];
        message.channel.sendMessage("The array is empty.");
    }
});

bot.login(token);