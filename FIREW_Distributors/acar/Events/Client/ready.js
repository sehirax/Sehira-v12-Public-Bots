const {} = require('discord.js');
const Punitives = require('../../../../Moderation/Database/Schema/Punitives');
const table = require('table');
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
 /**
 * @param {Client} client 
 */

module.exports = async () => {
    let sesKanalı = client.channels.cache.get(sistem.botSesKanali);
    if (sesKanalı) sesKanalı.join().catch(err => {});
    client.user.setActivity(sistem.botDurum.desc, {
        type: sistem.botDurum.type,
        url: sistem.botDurum.url,
    });
    client.ws.on('INTERACTION_CREATE', async interaction => {
        let GameMap = new Map([
            ["cezaListesi",roller.Buttons.vk],
            ["lastPunitives",roller.Buttons.dc],
            ["cezaPuanim",roller.Buttons.cekiliskatilimcisi],
    
        ])
        let name = interaction.data.custom_id        
        let member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(interaction.member.user.id)
        if(!GameMap.has(name) || !member) return;
        let Cezalar = await Punitives.find({Uye: member.id})
        let returnText;
        if(name == "cezaListesi") {
        let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
        data = data.concat(Cezalar.map(value => {          
            return [
                `#${value.No}`,
                `${value.Aktif == true ? "✅" : `❌`}`,
                `${tarihsel(value.Tarih)}`,
                `${value.Tip}`,
                `${value.Sebep}`
            ]
        }));
        let veriler = table.table(data, {
           columns: { 0: { paddingLeft: 1 }, 1: { paddingLeft: 1 }, 2: { paddingLeft: 1 }, 3: { paddingLeft: 1, paddingRight: 1 }, },
           border : table.getBorderCharacters(`void`),  
           drawHorizontalLine: function (index, size) {
               return index === 0 || index === 1 || index === size;
           }
        });
        returnText = `\`\`\`fix
${await Punitives.findOne({Uye: member.id}) ? veriler : `Tebrikler! ${member.guild.name} sunucusun da sana ait ceza bilgisine ulaşılamadı.`}\`\`\``
        }
        
        if(name == "lastPunitives") {
            let sesMute = await Punitives.find({Uye: member.id, Aktif: true, Tip: "Seste Susturulma"})
            let chatMute = await Punitives.find({Uye: member.id, Aktif: true, Tip: "Susturulma"})
            let Cezali = await Punitives.find({Uye: member.id, Aktif: true, Tip: "Cezalandırılma"})
            let aktifCezalarList = []
            if(Cezali) Cezali.forEach(ceza => {
                aktifCezalarList.push({
                    No: ceza.No,
                    Tip: ceza.Tip,
                    Yetkili: ceza.Yetkili ? member.guild.members.cache.get(ceza.Yetkili) ? member.guild.members.cache.get(ceza.Yetkili) : `<@${ceza.Yetkili}>` : ayarlar.sunucuIsmi,
                    Atılan: ceza.AtilanSure ? ceza.AtilanSure : "Kalıcı",
                    Kalkma: `${moment.duration(ceza.Kalkma - Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
                })
            })
            if(sesMute) sesMute.forEach(ceza => {
                aktifCezalarList.push({
                    No: ceza.No,
                    Tip: ceza.Tip,
                    Yetkili: ceza.Yetkili ? member.guild.members.cache.get(ceza.Yetkili) ? member.guild.members.cache.get(ceza.Yetkili) : `<@${ceza.Yetkili}>` : ayarlar.sunucuIsmi,
                    Atılan: ceza.AtilanSure ? ceza.AtilanSure : "Kalıcı",
                    Kalkma: `${moment.duration(ceza.Kalkma - Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
                })
            })
            if(chatMute) chatMute.forEach(ceza => {
                aktifCezalarList.push({
                    No: ceza.No,
                    Tip: ceza.Tip,
                    Yetkili: ceza.Yetkili ? member.guild.members.cache.get(ceza.Yetkili) ? member.guild.members.cache.get(ceza.Yetkili) : `<@${ceza.Yetkili}>` : ayarlar.sunucuIsmi,
                    Atılan: ceza.AtilanSure ? ceza.AtilanSure : "Kalıcı",
                    Kalkma: `${ceza.Kalkma ? moment.duration(ceza.Kalkma - Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı"}`
                })
            })

            returnText = `${aktifCezalarList ? 
aktifCezalarList.map(x => `${member.guild.emojis.cache.get(emojiler.Iptal)} ${x.Yetkili} tarafından **${x.Atılan}** süresince işlenen "__#${x.No}__" numaralı "__${x.Tip}__" türündeki cezalandırmanın kalkmasına **${x.Kalkma}** kaldı.`).join("\n") 
: `${member.guild.emojis.cache.get(emojiler.Onay)} Tebrikler! \`${member.guild.name}\` sunucusunda size ait aktif aktif cezaya ulaşılamadı.`}`
        }

        if(name == "cezaPuanim") {
                let res = await Punitives.find({ Uye: member.id })
                if (!res) return 0
                let filArray = res.map(x => (x.Tip))
                let Mute = filArray.filter(x => x == "Susturulma").length || 0
                let VMute = filArray.filter(x => x == "Seste Susturulma").length || 0
                let Jail = filArray.filter(x => x == "Cezalandırılma").length || 0
                let Ban = filArray.filter(x => x == "Yasaklanma").length || 0
                // let Warn = filArray.filter(x => x == "Uyarılma").length || 0
                let cezaPuanı = (Mute * 5) + (VMute * 8) + (Jail * 15) + (Ban * 30)
                returnText = `${member} aşağıda verilen verilere göre ceza puanın belirtilmiştir.

❯ ${Mute + VMute + Jail + Ban > 0 ? `${cezaPuanı < 1 ? `${member.guild.emojis.cache.get(emojiler.Onay)} Tebrikler! Hiç cezalandırma almamışsınız.` : `Toplam da **${Mute + VMute + Jail + Ban}** ceza-i işlem uygulanmış ve puanınız \`${cezaPuanı}\` ${member.guild.emojis.cache.get(emojiler.Iptal)}`}` : `${member.guild.emojis.cache.get(emojiler.Onay)} Tebrikler! Hiç cezalandırma almamışsınız.`} 
❯ Yasaklanma: **${Ban}** defa yasaklandırılmışsın.
❯ Cezalandırma: **${Jail}** defa cezalandırılmışsın.
❯ Seste Susturulma: **${VMute}** defa seste susturulmuşsun.
❯ Metin Susturulma: **${Mute}** defa metin kanalların da susturulmuşsun.`
        }
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: returnText ? returnText : `${member.guild.emojis.cache.get(emojiler.Onay)} Tebrikler! \`${member.guild.name}\` sunucusunda size ait aktif aktif cezaya ulaşılamadı.`,
                    flags: "64"
                }
            }
        })
        
    });



    client.ws.on('INTERACTION_CREATE', async interaction => {
        
        let name = interaction.data.custom_id
    
        let GameMap = new Map([
            ["vk",roller.Buttons.vk],
            ["dc",roller.Buttons.dc],
            ["cekkat",roller.Buttons.cekiliskatilimcisi],
            ["etkkat",roller.Buttons.etkinlikkatilimcisi],
            
            ["fornite", roller.Buttons.fortnite],
            ["valorant", roller.Buttons.valorant],
            ["mobgl", roller.Buttons.moblg],
            ["lol", roller.Buttons.lol],
            ["csgo", roller.Buttons.csgo],
            ["bh", roller.Buttons.bh],
            ["mc", roller.Buttons.mc],
            ["wr", roller.Buttons.wr],
            ["gta", roller.Buttons.gta],
            ["fivem", roller.Buttons.fivem],
            ["rust", roller.Buttons.rust],
            ["pubg", roller.Buttons.pubg],
            ["pubgmobile", roller.Buttons.pubgmobile],
    
        ])
    
        let member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(interaction.member.user.id)
        if(!GameMap.has(name) || !member) return;
        let role = GameMap.get(name)
        let returnText;
    
        if(member.roles.cache.has(role)){
            await member.roles.remove(role)
            returnText = `Rolünüz üzerinizden alındı.`
        }else{
            await member.roles.add(role)
            returnText = `Rolünüz üzerinize verildi.`
    
        }
        
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: returnText,
                    flags: "64"
                }
            }
        })
        
    });
    client.ws.on('INTERACTION_CREATE', async interaction => {
            
        let name = interaction.data.custom_id
    
        let GameMap = new Map([
            ["alone",roller.Buttons.alone],
            ["lovers",roller.Buttons.lovers],
            ["lgbt",roller.Buttons.lgbt],
    
        ])
        let Roller = [roller.Buttons.alone, roller.Buttons.lovers, roller.Buttons.lgbt]
        let member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(interaction.member.user.id)
        if(!GameMap.has(name) || !member) return;
        let role = GameMap.get(name)
        let returnText;
    
        if(member.roles.cache.has(role)){
            await member.roles.remove(role)
            returnText = `İlişki rolünüz üzerinizden alındı.`
        }else{
            if(Roller.some(x => member.roles.cache.has(x))) returnText = `İlişki rolü zaten almışsınız öncekini çıkartarak değiştirebilirsiniz.`
            if(!Roller.some(x => member.roles.cache.has(x))) {
                await member.roles.add(role)
                returnText = `İlişki rolü üzerinize verildi.`
            }
    
        }
        
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: returnText,
                    flags: "64"
                }
            }
        })
        
    });
    
    client.ws.on('INTERACTION_CREATE', async interaction => {
            
        let name = interaction.data.custom_id
    
        let GameMap = new Map([
            ["oğlak",roller.Buttons.oğlak],
            ["kova",roller.Buttons.kova],
            ["balık",roller.Buttons.balık],
            ["koç",roller.Buttons.koç],
            ["boğa",roller.Buttons.boğa],
            ["ikizler",roller.Buttons.ikizler],
            ["yengeç",roller.Buttons.yengeç],
            ["aslan",roller.Buttons.aslan],
            ["başak",roller.Buttons.başak],
            ["terazi",roller.Buttons.terazi],
            ["akrep",roller.Buttons.akrep],
            ["yay",roller.Buttons.yay],
        ])
        
        let Roller = [roller.Buttons.oğlak, roller.Buttons.kova, roller.Buttons.balık,roller.Buttons.koç,roller.Buttons.boğa,roller.Buttons.ikizler,roller.Buttons.yengeç,roller.Buttons.aslan,roller.Buttons.başak,roller.Buttons.terazi,roller.Buttons.akrep,roller.Buttons.yay
        ]
        let member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(interaction.member.user.id)
        if(!GameMap.has(name) || !member) return;
        let role = GameMap.get(name)
        let returnText;
        if(member.roles.cache.has(role)) {
            await member.roles.remove(role)
            returnText = `Burç rolünüz üzerinize alındı.`
        } else {
            if(Roller.some(x => member.roles.cache.has(x))) returnText = `Burç rolü zaten almışsınız öncekini çıkartarak değiştirebilirsiniz.`
            if(!Roller.some(x => member.roles.cache.has(x))) {
                await member.roles.add(role)
                returnText = `Burç rolü üzerinize verildi.`
            }
        }
        
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: returnText,
                    flags: "64"
                }
            }
        })
        
    });
    
    
    client.ws.on('INTERACTION_CREATE', async interaction => {
            
        let name = interaction.data.custom_id
    
        let GameMap = new Map([       
            ["mor", roller.Buttons.mor],
            ["lila", roller.Buttons.lila],
            ["kırmızı", roller.Buttons.kırmızı],
            ["yeşil", roller.Buttons.yeşil],
            ["turkuaz", roller.Buttons.turkuaz],
            ["turuncu", roller.Buttons.turuncu],
            ["mavi", roller.Buttons.mavi],
    
    
        ])
        let Renkler = [roller.Buttons.mor, roller.Buttons.lila, roller.Buttons.kırmızı,
            roller.Buttons.yeşil,
            roller.Buttons.turkuaz,
            roller.Buttons.turuncu,
            roller.Buttons.mavi
        ]
        let member = await client.guilds.cache.get(ayarlar.sunucuID).members.fetch(interaction.member.user.id)
        if(!GameMap.has(name) || !member) return;
        let role = GameMap.get(name)
        let returnText;
        
        if(!member.user.username.includes(ayarlar.tag) && !member.roles.cache.has(roller.tagRolü) && !member.roles.cache.has(roller.boosterRolü)) {
            returnText = `Booster veya taglı üye değilsiniz.`
        } else {
            if(member.roles.cache.has(role)){
                await member.roles.remove(role)
                returnText = `Renk rolünüz üzerinizden alındı.`
            } else{
                if(Renkler.some(x => member.roles.cache.has(x))) returnText = `Renk rolü zaten almışsınız öncekini çıkartarak değiştirebilirsiniz.`
                if(!Renkler.some(x => member.roles.cache.has(x))) {
                    await member.roles.add(role)
                    returnText = `Renk rolünüz üzerinize verildi.`
                }
            } 
        }
        
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: returnText,
                    flags: "64"
                }
            }
        })
        
    });
};

module.exports.config = {
    Event: "ready"
};

