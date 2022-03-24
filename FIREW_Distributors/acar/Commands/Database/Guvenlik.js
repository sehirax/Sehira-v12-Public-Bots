const { Client, Message, MessageEmbed} = require("discord.js");
const fs = require('fs')
let dizin = '../Moderation/acar/Settings/_guard.json'
module.exports = {
    Isim: "gsistem",
    Komut: ["güvenlik","yarram","gw"],
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık + " ᴳᵁᴬᴿᴰSystem", 'https://images-ext-2.discordapp.net/external/Y935T5KiZiUesilSyrVl-HOnv7PrzKMbWx3H2MGF82I/https/i.pinimg.com/originals/83/df/a4/83dfa4bd8729fceba2fc7d3e7bf13ac0.gif').setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    let hedef;
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(args[0]) hedef = args[0];
    if (rol) hedef = rol;
    if (uye) hedef = uye;
    let fullyönetim = guardConf.guardIzinliler || [];
    let SagtikRol = guardConf.rolYönetIzinliler || [];
    let banKick = guardConf.banKickIzinliler || [];
    let EverHere = guardConf.everyoneIzinliler || [];
    let EmojiIzin = guardConf.emojiIzinliler || [];
    if (!hedef) return message.channel.send( embed.setDescription(`Güvenlik sisteminden geçebilcek kişileri eklemek ister misin?\n**Örnek:**\`${sistem.prefix}güvenlik <@acar/@rol/ID> <full-rol-bankick-emoji-everhere>\``)
    .addField("Full Sunucu Yönetimi", fullyönetim.length > 0 ? fullyönetim.map(g => (message.guild.roles.cache.has(g) || message.guild.members.cache.has(g)) ? (message.guild.roles.cache.get(g) || message.guild.members.cache.get(g)) : g).join('\n') : "Yönetici Bulunamadı!")
    .addField("Rol (Sağ-Tık: `Ver/Al`)", SagtikRol.length > 0 ? SagtikRol.map(g => (message.guild.roles.cache.has(g) || message.guild.members.cache.has(g)) ? (message.guild.roles.cache.get(g) || message.guild.members.cache.get(g)) : g).join('\n') : "Yönetici Bulunamadı!")
    .addField("Yönetim (Sağ-Tık: `Ban/Kick`)", banKick.length > 0 ? banKick.map(g => (message.guild.roles.cache.has(g) || message.guild.members.cache.has(g)) ? (message.guild.roles.cache.get(g) || message.guild.members.cache.get(g)) : g).join('\n') : "Yönetici Bulunamadı!")
    .addField("Emoji (İzin: `Ekle/Düzenle/Sil`)", EmojiIzin.length > 0 ? EmojiIzin.map(g => (message.guild.roles.cache.has(g) || message.guild.members.cache.has(g)) ? (message.guild.roles.cache.get(g) || message.guild.members.cache.get(g)) : g).join('\n') : "Yönetici Bulunamadı!")
    .addField("Duyuru (Sohbet: `Everyone/Here`)", EverHere.length > 0 ? EverHere.map(g => (message.guild.roles.cache.has(g) || message.guild.members.cache.has(g)) ? (message.guild.roles.cache.get(g) || message.guild.members.cache.get(g)) : g).join('\n') : "Yönetici Bulunamadı!"));
    
    if(args[1] == "full") {
        if (fullyönetim.some(g => g.includes(hedef.id))) {
            fullyönetim = fullyönetim.filter(g => !g.includes(hedef.id));
            guardConf.guardIzinliler = fullyönetim;
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından full sunucu yönetimi sisteminden çıkartıldı!`));
          } else {
            guardConf.guardIzinliler.push(`${hedef.id}`);
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından full sunucu yönetimi sistemine eklendi!`));
          };
    } else if(args[1] == "rol") {
        if (SagtikRol.some(g => g.includes(hedef.id))) {
            SagtikRol = SagtikRol.filter(g => !g.includes(hedef.id));
            guardConf.rolYönetIzinliler = SagtikRol;
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Sağ-Tık Rol Ver/Al işlem sisteminden çıkartıldı!`));
          } else {
            guardConf.rolYönetIzinliler.push(`${hedef.id}`);
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Sağ-Tık Rol Ver/Al işlem sistemine eklendi!`));
          };
    } else if(args[1] == "bankick") {
        if (banKick.some(g => g.includes(hedef.id))) {
            banKick = banKick.filter(g => !g.includes(hedef.id));
            guardConf.banKickIzinliler = banKick;
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Sağ-Tık Ban/Kick işlem sisteminden çıkartıldı!`));
          } else {
            guardConf.banKickIzinliler.push(`${hedef.id}`);
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Sağ-Tık Ban/Kick işlem sistemine eklendi!`));
          };
    } else if(args[1] == "everhere") {
        if (EverHere.some(g => g.includes(hedef.id))) {
            EverHere = EverHere.filter(g => !g.includes(hedef.id));
            guardConf.everyoneIzinliler = EverHere;
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Everyone & Here işlem sisteminden çıkartıldı!`));
          } else {
            guardConf.everyoneIzinliler.push(`${hedef.id}`);
            fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Everyone & Here işlem sistemine eklendi!`));
          };
    } else if(args[1] == "emoji") {
      if (EmojiIzin.some(g => g.includes(hedef.id))) {
          EmojiIzin = EmojiIzin.filter(g => !g.includes(hedef.id));
          guardConf.emojiIzinliler = EmojiIzin;
          fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
            if (err) console.log(err);
          });
          message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Emoji (Ekle/Düzenle/Sil) işlem sisteminden çıkartıldı!`));
        } else {
          guardConf.emojiIzinliler.push(`${hedef.id}`);
          fs.writeFile(dizin, JSON.stringify(guardConf), (err) => {
            if (err) console.log(err);
          });
          message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından Emoji (Ekle/Düzenle/Sil) işlem sistemine eklendi!`));
        };
    };
    }
};