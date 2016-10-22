const Discord = require('discord.js');
const yt = require('ytdl-core');

const bot = new Discord.Client();
const token = 'YOUR TOKEN';
const tab = [];
var i = 0;
const prefix = ".";
var bool = true;

function music(voiceChannel, i, bool)
{
    if (bool == true) {
        voiceChannel.join().then(connnection => {
            let stream = yt(tab[i], {audioonly: true});
            const dispatcher = connnection.playStream(stream);
            dispatcher.on("end", () => {
                voiceChannel.leave();
                if (i < tab.length){
                    i++;
                    music(voiceChannel, i);
                } 
                if (i >= tab.length) {
                    i = 0;
                    music(voiceChannel, i);
                }
            });
        });
    }
}

bot.on('ready', () => {
  console.log('I am ready!');
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
    if (message.content === prefix + "stop") {
        message.delete();
        voiceChannel.leave();
        music(voiceChannel, i, false);
    }
    if (message.content.startsWith(prefix + "next")) {
        message.delete();
        if (i < tab.length) {
            i++;
        } if (i >= tab.length) {
            i = 0;
        }
        voiceChannel.leave();
        music(voiceChannel, i, true);
    }
    if (message.content.startsWith(prefix + "add")){
        message.delete();
        var link = message.content.split(' ');
        link.shift();
        link = link.join(' ');
        tab[tab.length] = link;
    }
});

bot.login(token);