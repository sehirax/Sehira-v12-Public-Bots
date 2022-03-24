const { Client, Collection } = require('discord.js');
const fs = require('fs')
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
class acar extends Client {
    constructor(options) {
        super(options);

            // Sistem Gereksinimi
                this.ayarlar = global.ayarlar = require('../Moderation/acar/Settings/_extends');
                this.kanalar = global.kanallar = require('../Moderation/acar/Settings/_channels.json');
                this.emojiler = global.emojiler = require('../Moderation/acar/Settings/_emojis.json');
                this.roller = global.roller = require('../Moderation/acar/Settings/_roles.json');
                this.sistem = global.sistem = require('../Moderation/acar/Settings/system');
                this.cevaplar = global.cevaplar = require('../Moderation/acar/Settings/reply');
                this.uPConf = global.uPConf = this.StConf = global.StConf = require('../Moderation/acar/Settings/_stat');
                this.taskConf = global.taskConf = require('../Moderation/acar/Settings/_task'); 
                this.guardConf = global.guardConf = require('../Moderation/acar/Settings/_guard.json');
            // Sistem Gereksinimi

            // em
                this.setMaxListeners(10000)
            // em

            //
                this.komutlar = new Collection();
                this.komut = new Collection(); 
                this.koruyucular = global.koruyucular = [];
            //

            // Logger
                this.logger = require("../Moderation/acar/Functions/Global.logger");
                this.on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
                .on("disconnect", () => this.logger.log("Bot is disconnecting...", "disconnecting"))
                .on("reconnecting", () => this.logger.log("Bot reconnecting...", "reconnecting"))
                .on("error", (e) => this.logger.log(e, "error"))
                .on("warn", (info) => this.logger.log(info, "warn"));

                //process.on("unhandledRejection", (err) => { {this.logger.log(err, "caution")} });
                process.on("warning", (warn) => { this.logger.log(warn, "varn") });
                process.on("beforeExit", () => { console.log('Sistem kapatılıyor...'); });
                process.on("uncaughtException", err => {
                    const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
                        console.error("Beklenmedik Hata: ", hata);
                       // process.exit(1);
                });
            // Logger
    }
    async fetchCommands() {
        let dirs = fs.readdirSync("./acar/Commands", { encoding: "utf8" });
        this.logger.log(`${dirs.length} category in client loaded.`, "category");
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./acar/Commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            this.logger.log(`${files.length} commands loaded in ${dir} category.`, "load");
            files.forEach(file => {
                let referans = require(`./acar/Commands/${dir}/${file}`);
                if(referans.onLoad != undefined && typeof referans.onLoad == "function") referans.onLoad(this);
                this.komutlar.set(referans.Isim, referans);
                if (referans.Komut) referans.Komut.forEach(alias => this.komut.set(alias, referans));
            });
        });
    }

    async fetchEvents() {
        let dirs = fs.readdirSync("./acar/Events", { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./acar/Events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let referans = require(`./acar/Events/${dir}/${file}`);
                this.on(referans.config.Event, referans);
            });
        });
     }
}


class Mongo {
    static Connect() {
        require('mongoose').connect(require('../Moderation/acar/Settings/system').MongoURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(() => {
            client.logger.log("Connected to the MongoDB.", "mongodb");
        }).catch((err) => {
            client.logger.log("Unable to connect to the MongoDB. Error: " + err, "error");
        });
    }

}


let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;

const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
    return tarihci;
};



const giveBot = global.giveBot = function giveBot(length){
    if(length > koruyucular.length) length = koruyucular.length;
    let availableBots = koruyucular.filter(e => !e.Yarram);
    if(availableBots.length <= 0) availableBots = koruyucular.sort((x,y) => x.sikOni - y.sikOni).slice(0, length);
    return availableBots;
}

const processBot = global.processBot = function processBot(bot, busy, job, equal = false){
    bot.Yarram = busy;
    if(equal) bot.sikOni = job;
    else bot.sikOni += job;

    let index = koruyucular.findIndex(e => e.user.id == bot.user.id);
    koruyucular[index] = bot;
}

module.exports = { acar, Mongo };