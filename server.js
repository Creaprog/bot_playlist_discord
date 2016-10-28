const Discord = require('discord.js');
const yt = require('ytdl-core');
const colors = require('colors');
const search = require('youtube-search');
const Music = require("./Music.js");

const bot = new Discord.Client();
const token = 'MjM4Mzg5MjQ4NzE2MzA4NDky.CvT0KA.Zx9W0eGl7omSe3mF6B6432WPSfI';
const prefix = ".";

colors.setTheme({
  custom: ['red', 'underline']
});

var music = new Music();

var opts = {
  maxResults: 3,
  key: 'AIzaSyAhfL9uPpEDFdSwi2IK-ZGlHfRLEmk-mqY'
};

bot.on('ready', () => {
  console.log("I am ready!".custom);
});

bot.on('message', message => {
    music.setVoiceChannel(message.member.voiceChannel);

    if (message.content.startsWith(prefix + "play")) {
        message.delete(message.author);
        if (!music.getVoiceChannel()) return message.reply("You need to connect a voice channel");
        if (music.getTab(0) == null) return message.reply('No music, please add.');
        else {
            music.voice();
        }
    }

    else if (message.content.startsWith(prefix + "pause")) {
        message.delete(message.author);
        music.pause();
    }

    else if (message.content.startsWith(prefix + "resume")) {
        message.delete(message.author);
        music.resume();
    }
    
    else if (message.content.startsWith(prefix + "stop")) {
        message.delete(message.author);
        music.stop();
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
            music.setTabEnd(results[y].link);
        });
    }

    else if (message.content.startsWith(prefix + "clear")) {
        message.delete(message.author);
        music.clearTab();
        message.channel.sendMessage("The array is empty.");
    }
});

bot.login(token);