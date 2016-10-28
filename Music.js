const yt = require('ytdl-core');

function Music() {
    this.i = 0;
    this.tab = [];
}

//Good
Music.prototype.setVoiceChannel = function (voiceChannel) {
    this.voiceChannel = voiceChannel;
}

//Good
Music.prototype.setI = function(i) {
    this.i = i;
}

//Good
Music.prototype.setTab = function(i, value) {
    this.tab[i] = value;
}

//Good
Music.prototype.setTabEnd = function(value) {
    this.tab[this.tab.length] = value;
}

//Good
Music.prototype.getVoiceChannel = function() {
    return this.voiceChannel;
}

//Good
Music.prototype.getTab = function (i) {
    return this.tab[i];
}

//Good
Music.prototype.getI = function() {
    return this.i;
}

//Good
Music.prototype.getLengthTab = function() {
    return this.tab.length;
}

//Good
Music.prototype.voice = function() {
    this.voiceChannel.join().then(connection => {
        let stream = yt(this.getTab(this.getI()), {audioonly: true});
        const streamoptions = { seek: 0,volume: 0.05 };
        const dispatcher = connection.playStream(stream, streamoptions);
            dispatcher.on("end", () => {
                if (this.getI() < this.getLengthTab()) this.setI(this.getI() + 1);
                if (this.getI() >= this.getLengthTab()) this.setI(0);
                return this.voice(this.getVoiceChannel(), this.getI());
            });
        });
}

module.exports = Music;