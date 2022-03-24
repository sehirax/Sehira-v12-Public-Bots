const { Client, Message, MessageEmbed} = require("discord.js");
const rolData = require("../../../../Moderation/Database/Schema/Security/Roles");
module.exports = {
    Isim: "dağıt",
    Komut: ["dagit"],
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    let rol = message.mentions.roles.first();
    if (!args[0] || isNaN(args[0])) return message.channel.send("Hata: `Lütfen geçerli bir rol ID'si belirt!`");
    let data = await rolData.findOne({guildID: ayarlar.sunucuID, roleID: args[0]})
    if(!data) return message.channel.send(`Hata: \`Database'de Rol Bulunamadı!\` lütfen yedeklemesi alınmış rol belirleyin.`)

    setTimeout(() => {
      let kanalPermVeri = data.channelOverwrites;
      if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
        let kanal = message.guild.channels.cache.get(perm.id);
        if (!kanal) return;
        setTimeout(() => {
          let yeniKanalPermVeri = {};
          perm.allow.forEach(p => {
            yeniKanalPermVeri[p] = true;
          });
          perm.deny.forEach(p => {
            yeniKanalPermVeri[p] = false;
          });
          kanal.createOverwrite(rol, yeniKanalPermVeri).catch(console.error);
        }, index*3000);
      });
    }, 3000);
    let length = data.members.length;
      if(length <= 0) return;
      let Tillahlar = koruyucular.filter(e => !e.Yarram);
      if(Tillahlar.length <= 0) Tillahlar = koruyucular.sort((x,y) => y.sikOni - x.sikOni).slice(0, Math.round(length / koruyucular.length));
      let perAnyBotMembers = Math.floor(length / Tillahlar.length);
      if(perAnyBotMembers < 1) perAnyBotMembers = 1;
      for (let index = 0; index < Tillahlar.length; index++) {
          const bot = Tillahlar[index];
          processBot(bot, true, perAnyBotMembers);
          let ids = data.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
          if(ids.length <= 0) {processBot(bot, false, -perAnyBotMembers); break;}
          let guild = bot.guilds.cache.first();
          
          ids.every(async id => {
              let member = guild.member(id);
              if(!member){
                  return true;
              }
              setTimeout(async() => {
                if(member.roles.cache.has(rol.id)) return
                await member.roles.add(rol.id)
            }, index*100);
          });
          processBot(bot, false, -perAnyBotMembers);
         }
      message.react(emojiler.Onay)
      message.channel.send(embed.setDescription(`${message.guild.emojis.cache.get(emojiler.Onay)} Rol kurulumu tamamlandı. dağıtım işlemi başladı, dağıtım yaparken oda izinlerini otomatik ayarlayacaktır.`))
    }
};