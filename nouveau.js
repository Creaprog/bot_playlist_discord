
const Discord = require("discord.js");
const yt = require('ytdl-core');
const client = new Discord.Client();
const prefix = "!";
client.login("MjMwMzg1OTQ5NTQyOTczNDQw.Cs0N4g.rzUW6vtHJinlWguj6g1j7dulZdI");
client.on("ready", function(){
  console.log("Bot ready to be used !");
});

  client.on('guildMemberAdd', (member) => {
  let channel = member.guild.channels.find("name", "general");
  channel.sendMessage("bienvenue poto" + member.user);
});
