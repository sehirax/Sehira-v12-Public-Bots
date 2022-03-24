const { Client, Message, MessageEmbed} = require("discord.js");

module.exports = {
    Isim: "herkeserolver",
    Komut: ["herkeserolver"],
    Kullanim: "herkeserolver # Sunucu içerisinde tüm üyelere belirtilen rolü verir.",
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
    let kull = client.SikimSonik.get(message.author.id) || 0
    if (kull < 1) return message.channel.send("Hata: `Lütfen dağıtıcı botlarını çalıştırın.`");
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(cevaplar.noyt)
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!rol) return message.channel.send("Hata: `Lütfen geçerli bir rol ID'si belirt!`").then(x => x.delete({timeout: 7500}));
    let length = message.guild.members.cache.filter(x => !x.user.bot && !x.hasPermission('ADMINISTRATOR') && !x.roles.cache.has(rol.id)).size
    if(length <= 0) return;
    let Tillahlar = koruyucular.filter(e => !e.Yarram);
    if(Tillahlar.length <= 0) Tillahlar = koruyucular.sort((x,y) => y.sikOni - x.sikOni).slice(0, Math.round(length / koruyucular.length));
    let perAnyBotMembers = Math.floor(length / Tillahlar.length);
    if(perAnyBotMembers < 1) perAnyBotMembers = 1;
    for (let index = 0; index < Tillahlar.length; index++) {
        const bot = Tillahlar[index];
        processBot(bot, true, perAnyBotMembers);
        let ids = message.guild.members.cache.filter(x => !x.user.bot && !x.hasPermission('ADMINISTRATOR') && !x.roles.cache.has(rol.id)).map(x => x.id).slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
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
    message.channel.send(embed.setDescription(`${rol} rolünü \`${message.guild.members.cache.filter(x => !x.user.bot && !x.hasPermission('ADMINISTRATOR') && !x.roles.cache.has(rol.id)).size}\` üyeye dağıtıcı sistemi ile dağıtmaya başladım.`).setFooter(ayarlar.embed.altbaşlık)).then(x => x.delete({timeout: 8000}));
    message.react(emojiler.Onay)
    }
};