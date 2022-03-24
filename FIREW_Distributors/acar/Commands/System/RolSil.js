const { Client, MessageEmbed } = require("discord.js");

module.exports = {
    Isim: "rolsil",
    Komut: ["rolsil"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    if (!args[0] || isNaN(args[0])) return message.channel.send(`Hata: \`Rol ID Belirle!\``);
    let rol = message.guild.roles.cache.get(args[0]);
    if(!rol) return message.channel.send(`Hata: \`Doğru Rol ID!\` lütfen rol ID'si belirtin aksi taktirde işlem yapamayacağım.`);
    message.guild.channels.cache.find(x => x.name == "guard-log").send(embed.setDescription(`\`${rol.name}\` (**${rol.id}**) isimli rol ${message.author} tarafından silindi.`))
    rol.delete({reason: `Guard Tarafınca ${message.author.id} ID'li yönetici Tarafından Kaldırıldı!`})
    message.channel.send(embed.setDescription(`${message.guild.emojis.cache.get(emojiler.Onay)} Başarıyla \`${rol.name}\` isimli rolü sildin.`))
    message.react(emojiler.Onay)
    

    }
};