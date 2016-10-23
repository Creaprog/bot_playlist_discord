const Discord = require('discord.js');
const yt = require('ytdl-core');
const colors = require('colors');
const search = require('youtube-search');

const bot = new Discord.Client();
const token = 'YOUR TOKEN DISCORD';
var tab = [];
var i = 0;
const prefix = ".";
var bool = true;

colors.setTheme({
  custom: ['red', 'underline']
});

var opts = {
  maxResults: 3,
  key: 'YOUR TOKEN YOUTUBE'
};

function music(voiceChannel, i, bool)
{
    if (bool == true) {
        voiceChannel.join().then(connnection => {
            let stream = yt(tab[i], {audioonly: true});
            const dispatcher = connnection.playStream(stream);
            dispatcher.on("end", () => {
                if (i < tab.length){
                    i++;
                    music(voiceChannel, i);
                }
                else if (i >= tab.length) {
                    i = 0;
                    music(voiceChannel, i);
                }
            });
        });
    }
}

bot.on('ready', () => {
  console.log("I am ready!".custom);
});

bot.on('message', message => {
    const voiceChannel = message.member.voiceChannel;

    if (message.content.startsWith(prefix + "play")) {
        message.delete();
        if (!voiceChannel) {
            return message.reply("You need to connect a voice channel");
        }
        if (tab[0] == null) {
            return message.reply('No music, please add.');
        }
        music(voiceChannel, i, true);
    }

    else if (message.content === prefix + "stop") {
        message.delete();
        voiceChannel.leave();
        music(voiceChannel, i, false);
    }

    else if (message.content.startsWith(prefix + "next")) {
        message.delete();
        if (i < tab.length) {
            i++;
        } else if (i >= tab.length) {
            i = 0;
        }
        music(voiceChannel, i, true);
    }

    else if (message.content.startsWith(prefix + "add")){
        message.delete();
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
});

bot.login(token);