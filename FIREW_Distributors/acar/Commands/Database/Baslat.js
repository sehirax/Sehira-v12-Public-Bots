const { Client, Message} = require("discord.js");
const { acar } = require('../../../Dists.Global.Client');
module.exports = {
    Isim: "start",
    Komut: ["başlat"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "",
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    client.SikimSonik = new Map()
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    let kull = client.SikimSonik.get(message.author.id) || 0
    client.SikimSonik.set(message.author.id, kull + 1)
    if (kull >= 1) return message.channel.send("Hata: Daha önce dağıtıcılar zaten başlatılmış.");
    message.react('✅')
    global.koruyucular = []
    sistem.SECTOKENS.DISTS.forEach(async (tkn) => {
        let Tillah = new acar()
        Tillah.on("ready", async () => {
            client.logger.log(`${Tillah.user.tag} isimli dağıtıcı başarıyla aktif oldu.`, "dist")
            Tillah.Yarram = false;
            Tillah.sikOni = 0;
            await global.koruyucular.push(Tillah);
            message.channel.send(`Merhaba, ben \`${Tillah.user.tag}\` topunun amınakoymaya geldim.`)
        })
        Tillah.login(tkn).then(e => {}).catch(e => {client.logger.log(`${tkn.substring(Math.floor(tkn.length / 2))} dağıtıcı giriş yapamadı.`, "varn")});
    });
    
 }
};