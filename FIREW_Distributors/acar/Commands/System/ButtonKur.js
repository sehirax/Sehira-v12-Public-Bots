const { Client, Message, MessageEmbed} = require("discord.js");
const disbut = require('discord-buttons');
disbut(client)
module.exports = {
    Isim: "buttonkur",
    Komut: ["buttonkurulumu"],
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    var button_1 = new disbut.MessageButton().setID("buttonoyunrolleri").setLabel("👾 Oyun Rolleri").setStyle("green");
    var button_2 = new disbut.MessageButton().setID("buttonburçlar").setLabel("♑ Burçlar").setStyle("green");
    var button_3 = new disbut.MessageButton().setID("buttonrenkler").setLabel("🌈 Renkler").setStyle("blurple");
    var button_4 = new disbut.MessageButton().setID("buttonilişkiler").setLabel("💞 İlişkiler").setStyle("red");
    var button_5 = new disbut.MessageButton().setID("buttondiğer").setLabel("🎁 Diğer").setStyle("gray");

    embed.setDescription(`Kurmak istediğiniz düğme grubunu aşağıdaki düğmelerden seçiniz.\n\`30 Saniye\` içerisinde otomatik olarak işlem iptal edilecektir.`)

    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3, button_4, button_5 ], embed: embed })
    var filter = (button) => button.clicker.user.id === message.member.id;
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

    collector.on("collect", async (button) => {
        msg.delete();
        if(button.id === "buttonoyunrolleri") {
            oyunRolleri(message)
            await button.reply.think(true)
            await button.reply.edit(`${message.guild.emojis.cache.get(emojiler.Onay)} Belirtilen düğme grubu kuruldu.`)
        }
        if(button.id === "buttonburçlar") {
            burçRolleri(message)
            await button.reply.think(true)
            await button.reply.edit(`${message.guild.emojis.cache.get(emojiler.Onay)} Belirtilen düğme grubu kuruldu.`)
        }
        if(button.id === "buttonrenkler") {
            renkRolleri(message)
            await button.reply.think(true)
            await button.reply.edit(`${message.guild.emojis.cache.get(emojiler.Onay)} Belirtilen düğme grubu kuruldu.`)
        }
        if(button.id === "buttonilişkiler") {
            ilişkiRolleri(message)
            await button.reply.think(true)
            await button.reply.edit(`${message.guild.emojis.cache.get(emojiler.Onay)} Belirtilen düğme grubu kuruldu.`)
        }
        if(button.id === "buttondiğer") {
            diğerRoller(message)
            await button.reply.think(true)
            await button.reply.edit(`${message.guild.emojis.cache.get(emojiler.Onay)} Belirtilen düğme grubu kuruldu.`)
        }
  });

  collector.on("end", async () => {
      msg.delete().catch(x => {})
  });
      }
};

function diğerRoller(message) {
    client.api.channels(message.channel.id).messages.post({ data: {"content":`${message.guild.emojis.cache.get(emojiler.Konfeti)} Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.

\`⦁\` Eğer \`@${message.guild.roles.cache.get(roller.Buttons.etkinlikkatilimcisi).name}\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 

\`⦁\` Eğer \`@${message.guild.roles.cache.get(roller.Buttons.cekiliskatilimcisi).name}\` Rolünü alırsanız sunucumuzda sıkça  vereceğimiz Nitro.Spotify,Netflix,Deezer,Exxen ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 

\`⦁\` Eğer \`@${message.guild.roles.cache.get(roller.Buttons.vk).name}\` Rolünü alırsanız sunucumuzda sıkça oynadığımız Vampir Köylü etkinliklerinden haberdar olabilirsiniz.

\`⦁\` Eğer \`@${message.guild.roles.cache.get(roller.Buttons.dc).name}\` Rolünü alırsanız sunucumuzda sıkça oynadığımız Doğruluk Mu? Cesaretlik Mi? etkinliklerinden haberdar olabilirsiniz.

**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\` `,"components":[{"type":1,"components":[

        {"type":2,"style":2,"custom_id":"etkkat","label":"🎆 Etkinlik Katılımcısı"},
        {"type":2,"style":4,"custom_id":"cekkat","label":"🎉 Çekiliş Katılımcısı"},
        {"type":2,"style":3,"custom_id":"vk","label":"📍 V/K Katılımcısı"},
        {"type":2,"style":3,"custom_id":"dc","label":"🚩 D/C Katılımcısı"},
        
    ]}]} })
    message.react(emojiler.Onay)
message.delete({timeout: 7500})
}



function ilişkiRolleri(message) {
    client.api.channels(message.channel.id).messages.post({ data: {"content":"Aşağıda ki menüden kendinize ilişki rolü seçebilirsiniz. Bir ilişki rolünü almak için o aşağıda ki düğmeye tıklayın.","components":[{"type":1,"components":[

        {"type":2,"style":2,"custom_id":"alone","label":"💔 Sevgilim Yok !"},
        {"type":2,"style":4,"custom_id":"lovers","label":"💞 Sevgilim Var !"},
        {"type":2,"style":3,"custom_id":"lgbt","label":"🌈 LGBT"},
        
    ]}]} })
    message.react(emojiler.Onay)
message.delete({timeout: 7500})
}


function renkRolleri(message) {
    client.api.channels(message.channel.id).messages.post({ data: {"content":"Aşağıda ki menüden kendinize renk rolü seçebilirsiniz. Bir renk rolünü almak için o aşağıda ki düğmeye tıklayın.","components":[{"type":1,"components":[

        {"type":2,"style":1,"custom_id":"mor","label":"Mor", "emoji": { "name": "morkalp", "id": "856145474377875456" }},
        {"type":2,"style":1,"custom_id":"lila","label":"Lila", "emoji": { "name": "morkalp", "id": "856145474377875456" }},
        {"type":2,"style":1,"custom_id":"kırmızı","label":"Kırmızı", "emoji": { "name": "kirmizi", "id": "801816640785743912" }},
        {"type":2,"style":1,"custom_id":"yeşil","label":"Yeşil", "emoji": { "name": "yesilkalp", "id": "857367045411045388" }},
        {"type":2,"style":1,"custom_id":"turkuaz","label":"Turkuaz", "emoji": { "name": "turkuazkalp", "id": "856134433907933184" }},
        
    ]},
    {"type":1,"components":[

        {"type":2,"style":1,"custom_id":"turuncu","label":"Turuncu", "emoji": { "name": "turuncu", "id": "856148370561040385" }},
        {"type":2,"style":1,"custom_id":"mavi","label":"Mavi", "emoji": { "name": "mavikalp", "id": "857367024337682443" }},
        
    ]}]} })

    message.react(emojiler.Onay)
message.delete({timeout: 7500})
}


function burçRolleri(message) {
    client.api.channels(message.channel.id).messages.post({ data: {"content":"Aşağıda ki menüden kendinize burç rolü seçebilirsiniz. Bir burç rolünü almak için o aşağıda ki düğmeye tıklayın.","components":[{"type":1,"components":[

        {"type":2,"style":3,"custom_id":"oğlak","label":"Oğlak", "emoji": { "name": "nexus_9oglak", "id": "850018714349731840" }},
        {"type":2,"style":3,"custom_id":"kova","label":"Kova", "emoji": { "name": "nexus_9kova", "id": "850018714349731881" }},
        {"type":2,"style":3,"custom_id":"balık","label":"Balık", "emoji": { "name": "nexus_9balık", "id": "850018714464157716" }},
        {"type":2,"style":3,"custom_id":"koç","label":"Koç", "emoji": { "name": "nexus_9koc", "id": "850018714464157716" }},
        {"type":2,"style":3,"custom_id":"boğa","label":"Boğa", "emoji": { "name": "nexus_9boga", "id": "850018714090602526" }},
        
    ]},
    {"type":1,"components":[

        {"type":2,"style":3,"custom_id":"ikizler","label":"İkizler", "emoji": { "name": "nexus_9ikizler", "id": "850018714308968448" }},
        {"type":2,"style":3,"custom_id":"yengeç","label":"Yengeç", "emoji": { "name": "nexus_9yengec", "id": "850018714630881350" }},
        {"type":2,"style":3,"custom_id":"aslan","label":"Aslan", "emoji": { "name": "nexus_9aslan", "id": "850018713281232926" }},
        {"type":2,"style":3,"custom_id":"başak","label":"Başak", "emoji": { "name": "nexus_9basak", "id": "850018713590693908" }},
        {"type":2,"style":3,"custom_id":"terazi","label":"Terazi", "emoji": { "name": "nexus_9terazi", "id": "850018714546995200" }},
        
    ]},
    {"type":1,"components":[

        {"type":2,"style":3,"custom_id":"akrep","label":"Akrep", "emoji": { "name": "nexus_9akrep", "id": "850018713071910923" }},
        {"type":2,"style":3,"custom_id":"yay","label":"Yay", "emoji": { "name": "nexus_9yay", "id": "850018714346586143" }},
        
    ]}
    ]}})

    message.react(emojiler.Onay)
    message.delete({timeout: 7500})
}

function oyunRolleri(message) {
    client.api.channels(message.channel.id).messages.post({ data: {"content":"Aşağıda ki menüden kendinize oyun rolleri seçebilirsiniz. Bir oyun rolünü almak için o aşağıda ki düğmeye tıklayın.","components":[{"type":1,"components":[

        {"type":2,"style":3,"custom_id":"fornite","label":"Fornite", "emoji": { "name": ":Fortnite:", "id": "830027412775370812" }},
        {"type":2,"style":3,"custom_id":"valorant","label":"Valorant", "emoji": { "name": ":Valorant:", "id": "851941396361642005" }},
        {"type":2,"style":3,"custom_id":"mobgl","label":"Mobile Legends", "emoji": { "name": ":MobilLegends:", "id": "849795923995656244" }},
        {"type":2,"style":3,"custom_id":"lol","label":"League of Legends", "emoji": { "name": ":LoL:", "id": "851943484327985182" }},
        {"type":2,"style":3,"custom_id":"csgo","label":"Counter-Strike: Global Offensive", "emoji": { "name": ":Csgo:", "id": "851941458469847122" }},
        
    ]},
    {"type":1,"components":[

        {"type":2,"style":3,"custom_id":"bh","label":"Brawlhalla", "emoji": { "name": ":brawlhalla:", "id": "862324617766764584" }},
        {"type":2,"style":3,"custom_id":"mc","label":"Minecraft", "emoji": { "name": ":minecraft:", "id": "862428269817888848" }},
        {"type":2,"style":3,"custom_id":"wr","label":"Wild Rift", "emoji": { "name": ":WildRift:", "id": "812028328369717279" }},
        {"type":2,"style":3,"custom_id":"gta","label":"Grand Theft Auto V", "emoji": { "name": ":gta:", "id": "806802749937287168" }},
        {"type":2,"style":3,"custom_id":"rust","label":"Rust", "emoji": { "name": ":rust:", "id": "862428780056281119" }},
        
    ]},
    {"type":1,"components":[

        {"type":2,"style":3,"custom_id":"fivem","label":"FiveM", "emoji": { "name": ":nexus_zfivem:", "id": "850014778445267024" }},
        {"type":2,"style":3,"custom_id":"pubg","label":"PlayerUnknown's Battlegrounds", "emoji": { "name": ":pubg:", "id": "828285104124198952" }},
        {"type":2,"style":3,"custom_id":"pubgmobile","label":"PUBG:MOBILE", "emoji": { "name": ":pubg:", "id": "862324528143401041" }},
        
    ]}
    ]} })
    
    message.react(emojiler.Onay)
message.delete({timeout: 7500})
}

const punitivesPanel = global.punitivesPanel = function punitivesPanel(message) {
 client.api.channels(message.channel.id).messages.post({ data: {"content":`${message.guild.emojis.cache.get(emojiler.Cezalandırıldı)} Aşağıda ki düğmelerden ceza listenizi, ceza puanını ve aktif cezanızın kalan süresini görüntülüyebilirsiniz.`,"components":[{"type":1,"components":[

        {"type":2,"style":2,"custom_id":"cezaPuanim","label":"Ceza Puanı", "emoji": { "name": "kirmizi", "id": "831159273177874432" }},
         {"type":2,"style":3,"custom_id":"cezaListesi","label":"Cezalarım", "emoji": { "name": "morkalp", "id": "831159362869133345" }},
        {"type":2,"style":4,"custom_id":"lastPunitives","label":"Kalan Zamanım?", "emoji": { "name": "kirmizi", "id": emojiler.ChatSusturuldu }}
        
        
        ]}]} })
    message.react(emojiler.Onay)
message.delete({timeout: 7500})
}