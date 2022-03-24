const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    Isim: "tagsızat",
    Komut: ["tagsızkayıtsız"],
    Kullanim: "tagsızat @sehira/ID",
    Aciklama: "Sunucudaki üyeler içerisinde tagı olmayanları kayıtsıza at.",
    Kategori: "-",
    Extend: false,
    
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
    const embed = new MessageEmbed()
    .setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true}))
    .setColor(ayarlar.embed.renk) 
    if(!ayarlar.taglıalım) return message.channel.send(`${message.guild.emojis.cache.get(emojiler.Iptal)} [**HATA**]:` + ' `Taglı-Alım` modu kapalı olduğundan dolayı işlem iptal edildi.');
    let tagsızlar = message.guild.members.cache.filter(x => !x.user.username.includes(ayarlar.tag) && !x.roles.cache.has(roller.vipRolü)  && !x.roles.cache.has(roller.boosterRolü) 
    && (x.roles.cache.has(roller.erkekRolü) || x.roles.cache.has(roller.kadınRolü)))
    tagsızlar.forEach(uye => {
            uye.setNickname(`${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
            uye.roles.set(roller.kayıtsızRolleri)
            if(uye.voice.channel) uye.voice.kick()
    })
    message.channel.send(embed.setDescription(`Sunucuda kayıtlı olup tagı olmayan \`${tagsızlar.size}\` üye kayıtsıza atıldı!`).setFooter(ayarlar.embed.altbaşlık)).then(x => x.delete({timeout: 8000}));
    message.react(emojiler.Onay)

 }
};