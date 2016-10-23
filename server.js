const Discord = require('discord.js');
const yt = require('ytdl-core');
const colors = require('colors');
const search = require('youtube-search');

const bot = new Discord.Client();
const token = 'MjM4Mzg5MjQ4NzE2MzA4NDky.Culi-Q.qoX0kXDHHD9bn9CVMIfSp1icd40';
var tab = [];
var i = 0;
const prefix = ".";
var bool = false;

colors.setTheme({
  custom: ['red', 'underline']
});

var opts = {
  maxResults: 3,
  key: 'AIzaSyCeFyuWebGJ5BLLQlPzB5nuoJNp9qdVhpc'
};

function music(voiceChannel, i, bool)
{
    if (bool == true) {
        voiceChannel.join().then(connection => {
            let stream = yt(tab[i], {audioonly: true});
            const dispatcher = connection.playStream(stream);
            dispatcher.on("end", () => {
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
  console.log("I am ready!".custom);
});

bot.on('message', message => {
    const voiceChannel = message.member.voiceChannel;

    if (message.content.startsWith(prefix + "play")) {
        bool = true;
        message.delete(message.author);
        if (!voiceChannel) return message.reply("You need to connect a voice channel");
        if (tab[0] == null) return message.reply('No music, please add.');
        music(voiceChannel, i, true);
    }

    else if (message.content.startsWith(prefix + "stop")) {
        message.delete(message.author);
        voiceChannel.leave();
        bool = false;
        music(voiceChannel, i, false);
    }

    else if (message.content.startsWith(prefix + "next")) {
        message.delete(message.author);
        if (i < tab.length) i++;
        if (i >= tab.length) i = 0;
        if (bool) music(voiceChannel, i, true);
    }

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