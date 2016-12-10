const Discord = require('discord.js');
const yt = require('ytdl-core');
const colors = require('colors');
const search = require('youtube-search');
const Music = require("./Music.js");
var express = require('express');
var app = express();
const bot = new Discord.Client();
const music = new Music();

const token = 'Token Discord';

colors.setTheme({
  custom: ['red', 'underline']
});

const opts = {
  maxResults: 3,
  key: 'Token Google'
};

bot.on('ready', () => {
  console.log("I am ready!".custom);
});

bot.on('message', message => {
    music.setVoiceChannel(message.member.voiceChannel);
    var array_msg = message.content.split(' ');
    switch (array_msg[0]) {
        case (".play") :
            console.log("Play");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("You need to connect a voice channel");
            if (music.getTab(0) == null) return message.reply('No music, please add.');
            else music.voice();
            break;
        case (".pause") :
            console.log("Pause");
            message.delete(message.author);
            music.pause();
            break;
        case (".resume") :
            console.log("Resume");
            message.delete(message.author);
            music.resume();
            break;
        case (".stop") :
            console.log("Stop");
            message.delete(message.author);
            music.stop();
            message.channel.sendMessage("The array is empty.");
            break;
        case (".add") :
            console.log("Add");
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
            break;
        case (".link") :
            console.log("Link");
            message.delete(message.author);
            var link = message.content.split(' ');
            link.shift();
            link = link.join(' ');
            console.log(link);
            music.setTabEnd(link);
            break;
        case (".volume") :
            console.log("Volume");
            message.delete(message.author);
            var link = message.content.split(' ');
            link.shift();
            link = link.join(' ');
            music.volume(link/100);
            break;
        case (".help") :
            console.log("Help");
            message.reply("\n.play permet de start la playlist\n .pause permet de mettre la musique en pause\n .resume permet de remettre la musique quand elle est en pause\n .stop permet de mettre à l'arrêt.\n .volume permet de modifier le volume valeur comprise entre 1 à 200");
            break;
        case (".next") :
            console.log("Next");
            message.delete(message.author);
            if (music.getI() < music.getLengthTab()) music.setI(this.i + 1);
            if (music.getI() >= music.getLengthTab()) music.setI(0);
            music.next();
            break;
    }
});

app.get('/', function (req, res) {
    var obj = new Object();
    obj.test = "Hello World";
    obj.wtf = "Wtf dude !";
    var json = JSON.stringify(obj);
    res.send(json);
});

app.get('/playlist', function (req, res) {
    var json = JSON.stringify(music.tab);
    res.send(json);
});

app.listen(8080);
bot.login(token);
