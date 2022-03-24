const { Client, Message, MessageEmbed} = require("discord.js");
const rolData = require('../../../../Moderation/Database/Schema/Security/Roles');
const mongoose = require('mongoose');
module.exports = {
    Isim: "backup",
    Komut: ["yedekle"],
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
    await rolData.deleteMany({});
    if(rolData) { await rolData.deleteMany({}); }
    message.guild.roles.cache.filter(r => r.name !== "@everyone" && !r.managed).forEach(async role => {
    let roleChannelOverwrites = [];
    message.guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id)).forEach(c => {
     let channelPerm = c.permissionOverwrites.get(role.id);
     let pushlanacak = { id: c.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
     roleChannelOverwrites.push(pushlanacak);
    });
       await new rolData({
         _id: new mongoose.Types.ObjectId(),
         guildID: ayarlar.sunucuID,
         roleID: role.id,
         name: role.name,
         color: role.hexColor,
         hoist: role.hoist,
         position: role.position,
         permissions: role.permissions,
         mentionable: role.mentionable,
         time: Date.now(),
         members: role.members.map(m => m.id),
         channelOverwrites: roleChannelOverwrites
       }).save();
     })        
     message.channel.send(embed.setDescription(`${message.guild.emojis.cache.get(emojiler.Onay)} \`Manuel\` olarak yedekleme işlemi başarıyla alındı.`)).then(x => x.delete({timeout: 7500}))
     message.react(emojiler.Onay);
     client.logger.log(`ROL => Manuel olarak backup işlemi gerçekleştirildi. (${message.author.tag})`, "backup") 
    }
};