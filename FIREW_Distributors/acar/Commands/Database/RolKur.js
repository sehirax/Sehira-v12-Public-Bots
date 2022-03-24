const { Client, Message, MessageEmbed} = require("discord.js");
const rolData = require("../../../../Moderation/Database/Schema/Security/Roles");
module.exports = {
    Isim: "rolkur",
    Komut: ["rolkur"],
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
    if (!args[0] || isNaN(args[0])) return message.channel.send(`Hata: \`Rol ID Belirle!\` lütfen kurmam için bana silinmiş veya yedeklenmiş rol numarası gir.`).then(x => x.delete({timeout: 7500}));
    rolData.findOne({guildID: ayarlar.sunucuID, roleID: args[0]}, async (err, roleData) => {
      if(!roleData) return message.channel.send(`Hata: \`Belirtilen rol idsine sahip veritabanında rol bulunamadı.\``).then(x => x.delete({timeout: 7500}));
      let kurulanRol = await message.guild.roles.create({
          data: {
            name: roleData.name,
            color: roleData.color,
            hoist: roleData.hoist,
            permissions: roleData.permissions,
            position: roleData.position,
            mentionable: roleData.mentionable
          },
          reason: "Sen Şimdi Naneyi Yemedin Mi?"
        });
        message.channel.send(embed.setDescription(`${message.guild.emojis.cache.get(emojiler.Onay)} Başarılı bir şekilde ${kurulanRol} kurulumu tamamlandı. Rol dağıtımı için: \`${sistem.prefix}dağıt ${args[0]} <@&${kurulanRol.id}>\``))
      })
    }
};