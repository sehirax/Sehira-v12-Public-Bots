const { VoiceState, MessageEmbed } = require("discord.js");
const Sestekiler = new Map()
 /**
 * @param {VoiceState} oldState
 * @param {VoiceState} newState 
 */

 module.exports = async (oldState, newState) => {
        let logKanali = newState.guild.channels.cache.find(x => x.name == "ses-log")
        if (!oldState.channelID && newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
        if (oldState.channelID && !newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
        if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi ses kanalını **değiştirdi!** (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`).catch();
        if (oldState.channelID && oldState.selfMute && !newState.selfMute) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
        if (oldState.channelID && !oldState.selfMute && newState.selfMute) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
        if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
        if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName} (${newState.id})\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
}

module.exports.config = {
    Event: "voiceStateUpdate"
}


/**
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 */

client.on("voiceStateUpdate", async (oldState, newState) => {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, newState.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    if(newState.member.hasPermission('ADMINISTRATOR') 
    || newState.member.roles.cache.has(roller.boosterRolü)
    || roller.üstYönetimRolleri.some(oku => newState.member.roles.cache.has(oku)) 
    || roller.altYönetimRolleri.some(oku => newState.member.roles.cache.has(oku)) 
    || roller.kurucuRolleri.some(oku => newState.member.roles.cache.has(oku)) 
    || roller.yönetimRolleri.some(oku => newState.member.roles.cache.has(oku))) return;
    let logKanali = newState.guild.channels.cache.find(x => x.name == "nsfw-log")
    if (oldState.member.nickname) {
        let ageLimit = oldState.member.nickname.includes("|") && oldState.member.nickname.split("| ")[1] || 0
    if (!oldState.channelID && newState.channelID) {
        if (newState.channel && newState.channel.name.includes("+18")) {
            if(ageLimit < 18) {
                await logKanali.send(`${newState.member}`, {embed: embed.setDescription(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı \`${newState.channel.name}\` isimli kanaldan atıldı!`)})
                await newState.member.send(`${newState.member} **18 yaşından** küçük olduğun için \`${newState.channel.name}\` isimli kanaldan atıldın!`).catch(e => { });
                await newState.member.voice.kick().catch(e => { });
            }
        }
    }
    if (oldState.channelID && newState.channelID) {
        if (newState.channel && newState.channel.name.includes("+18")) {
            if(ageLimit < 18) {
                await logKanali.send(`${newState.member}`, {embed: embed.setDescription(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı \`${newState.channel.name}\` isimli kanaldan atıldı!`)})
                await newState.member.send(`${newState.member} **18 yaşından** küçük olduğun için \`${newState.channel.name}\` isimli kanaldan atıldın!`).catch(e => { });
                await newState.member.voice.kick().catch(e => { });
            }
        }
    }
}


})