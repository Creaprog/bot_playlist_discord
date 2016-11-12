const Discord = require('discord.js');
const yt = require('ytdl-core');
const colors = require('colors');
const search = require('youtube-search');
const Music = require("./Music.js");

const bot = new Discord.Client();
const music = new Music();

const token = 'MjM4Mzg5MjQ4NzE2MzA4NDky.CvVc5w.JKweHqFeJqcS9IOD-t9vlWBQwBA';

colors.setTheme({
  custom: ['red', 'underline']
});

const opts = {
  maxResults: 3,
  key: 'AIzaSyBCB2kGp1sScTqZDJF8Ic7MuT8xSfrF9EE'
};

bot.on('ready', () => {
  console.log("I am ready!".custom);
});

bot.on('message', message => {
    music.setVoiceChannel(message.member.voiceChannel);
    let array_msg = message.content.split(' ');
    switch (array_msg[0]) {
        case (".play") :
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("You need to connect a voice channel");
            if (music.getTab(0) == null) return message.reply('No music, please add.');
            else music.voice();
            break;
        case (".pause") :
            message.delete(message.author);
            music.pause();
            break;
        case (".resume") :
            message.delete(message.author);
            music.resume();
            break;
        case (".stop") :
            message.delete(message.author);
            music.stop();
            message.channel.sendMessage("The array is empty.");
            break;
        case (".add") :
            message.delete(message.author);
            let link = message.content.split(' ');
            link.shift();
            link = link.join(' ');
            search(link, opts, function(err, results) {
                if(err) return console.log(err);
                for (let y = 0; results[y].kind == 'youtube#channel'; y++);
                message.channel.sendMessage(results[y].link);
                music.setTabEnd(results[y].link);
            });
            break;
        case (".link") :
            message.delete(message.author);
            let link = message.content.split(' ');
            link.shift();
            link = link.join(' ');
            console.log(link);
            music.setTabEnd(link);
            break;
        case (".volume") :
            message.delete(message.author);
            let link = message.content.split(' ');
            link.shift();
            link = link.join(' ');
            music.volume(link/100);
            break;
    }

/*
    if (message.content.startsWith(prefix + "next")) {
        message.delete(message.author);
        if (i < tab.length) i++;
        if (i >= tab.length) i = 0;
        voiceChannel.leave();
        music(voiceChannel, i);
    }
*/

});

bot.login(token);