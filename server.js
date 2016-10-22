const Discord = require('discord.js');
const yt = require('ytdl-core');

const bot = new Discord.Client();
const token = 'Your Token';
const tab = [];
var i = 0;
const prefix = ".";

function music(voiceChannel, i)
{
    voiceChannel.join().then(connnection => {
        let stream = yt(tab[i], {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        dispatcher.on("end", () => {
            voiceChannel.leave();
            console.log("tableau : " + tab.length);
            console.log("i : " + i);
            if (i < tab.length){
                i++;
                music(voiceChannel, i);
            } if (i >= tab.length) {
                i = 0;
                music(voiceChannel, i);
            }
        });
    });
}

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', message => {
    const voiceChannel = message.member.voiceChannel;

    if (message.content.startsWith(prefix + "play")) {
        message.delete();
        if (!voiceChannel) {
            return message.reply("Tu dois être co sur un salon vocal.");
        }
        if (tab[0] == null) {
            console.log("Pas de music.");
            return message.reply('Pas de music, il faut add');
        }
        music(voiceChannel, i);
    }
    if (message.content === prefix + "stop") {
        message.delete();
        voiceChannel.leave();
    }
    if (message.content.startsWith(prefix + "next")) {
        message.delete();
        if (i < tab.length) {
            i++;
        } if (i >= tab.length) {
            i = 0;
        }
        voiceChannel.leave();
        music(voiceChannel, i);
    }
    if (message.content.startsWith(prefix + "add")){
        message.delete();
        var link = message.content.split(' ');
        link.shift();
        link = link.join(' ');
        console.log(link);
        tab[tab.length] = link;
    }
});

bot.login(token);