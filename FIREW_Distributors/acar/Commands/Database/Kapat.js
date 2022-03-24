const { Client, Message} = require("discord.js");
const { acar } = require('../../../Dists.Global.Client');
module.exports = {
    Isim: "kapat",
    Komut: ["stop","kamk"],
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
    client.SikimSonik.set(message.author.id, kull - 1)
    if (kull < 1) return message.channel.send("Hata: Daha önce dağıtıcılar zaten kapatılmış.");
    message.react('✅')
        koruyucular.forEach(cl => {
	cl.destroy()
	})
 }
};