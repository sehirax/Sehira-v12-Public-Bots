const { Client, Message} = require("discord.js");
const StatsSchema = require('../../../../Moderation/Database/Schema/Stats')
module.exports = {
    Isim: "stattemizle",
    Komut: ["stat-temizle"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "",
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    message.channel.send(`${message.guild.emojis.cache.get(emojiler.Onay)} Başarıyla haftalık veriler temizlendi.`).then(async (x) => {
    
      await StatsSchema.updateMany({ guildID: message.guild.id }, { voiceStats: new Map(), chatStats: new Map(), voiceCameraStats: new Map(), voiceStreamingStats: new Map() });
            let stats = await StatsSchema.find({ guildID: message.guild.id});
            stats.filter(s => !message.guild.members.cache.has(s.userID)).forEach(s => StatsSchema.findByIdAndDelete(s._id));
            x.delete({timeout: 5000})
    })
    

    }
};