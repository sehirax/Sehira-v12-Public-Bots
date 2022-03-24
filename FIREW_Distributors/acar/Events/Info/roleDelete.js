const { MessageEmbed , Guild} = require("discord.js");

/**
 * @param {Guild} role 
 */

module.exports = async role => {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, client.guilds.cache.get(ayarlar.sunucuID).iconURL({dynamic: true}))
    .setTitle("Sunucuda Rol Silindi!").setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık + ` • ${tarihsel(Date.now())}`)
    let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000) return;
    embed.setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından ${role.name} (__${role.id}__) rolü silindi. \`${sistem.prefix}rolkur ${role.id}\` komutu ile kurulum yapabilirsiniz.`);
    let loged = role.guild.channels.cache.find(x=> x.name === "guard-log");
    if(loged) await loged.send({embed: embed});
    role.guild.owner.send({embed: embed}).catch(err => {})
}

module.exports.config = {
    Event: "roleDelete"
}