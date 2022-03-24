const { Client } = require('discord.js');
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
            
            // Logger
                this.logger = require("../Moderation/acar/Functions/Global.logger");
                this.on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
                .on("disconnect", () => this.logger.log("Bot is disconnecting...", "disconnecting"))
                .on("reconnecting", () => this.logger.log("Bot reconnecting...", "reconnecting"))
                .on("error", (e) => this.logger.log(e, "error"))
                .on("warn", (info) => this.logger.log(info, "warn"));

                process.on("unhandledRejection", (err) => { });
                process.on("warning", (warn) => { this.logger.log(warn, "varn") });
                process.on("beforeExit", () => { console.log('Sistem kapatılıyor...'); });
                process.on("uncaughtException", err => {
                    const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
                        console.error("Beklenmedik Hata: ", hata);
                       // process.exit(1);
                });
            // Logger
    }
}

let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;

const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
    return tarihci;
};

module.exports = { acar };