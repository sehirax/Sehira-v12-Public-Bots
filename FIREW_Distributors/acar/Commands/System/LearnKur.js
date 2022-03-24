const { Client, Message, MessageEmbed} = require("discord.js");
const disbut = require('discord-buttons');

module.exports = {
    Isim: "learnkur",
    Komut: ["bilgilendirmekur","bilgikur"],
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    var yetkilinasilolunur = new disbut.MessageButton().setID("learnyetkili").setLabel("🎉 Nasıl Yetkili Olunur?").setStyle("blurple");
    var yetkinasilatlanir = new disbut.MessageButton().setID("yetkiatlanir").setLabel("📊 Terfi Nedir? Nasıl Yetki Atlanır?").setStyle("green");
    var kayitnasilyapilir = new disbut.MessageButton().setID("kayitnasilyapilir").setLabel("🔸 Kayıt Nasıl Yapılır?").setStyle("gray");
    var davet = new disbut.MessageButton().setID("davet").setLabel("📩 Nasıl Davet Edilir?").setStyle("gray");
    var taglı = new disbut.MessageButton().setID("taglı").setLabel("Nasıl Taglı Kullanılır?").setStyle("red").setEmoji(emojiler.Tag);
    embed.setDescription(`:tada: Aşağıda ki düğmelerden bilgi almak istediğiniz kategoriyi seçiniz, seçtiğiniz kategori hakkında size bilgi verilecektir.`)

    let msg = await message.channel.send({ buttons : [ 
      yetkilinasilolunur,
      yetkinasilatlanir,
      kayitnasilyapilir,
      davet,
      taglı

     ], embed: embed })
    var filter = (button) => button.clicker.user.id;
    let collector = await msg.createButtonCollector(filter)

    collector.on("collect", async (button) => {

        if(button.id === "learnyetkili") {
            await button.reply.think(true)
            await button.reply.edit(embed.setTitle('İki Adımda Nasıl Yetkili Olunur?').setDescription(`\`1.\` Sunucumuz da yetkili olabilmek için \`${sistem.prefix}başvuru <Açıklama>\` şeklinde başvuru işlemini yapabilirsiniz.\n\`2.\` Başvurunuz yönetimde ki yetkililere ulaştıktan ve onaylandıktan sonra size otomatik olarak yetkiniz verilecektir.\n\n__**NOT**__: Özel Mesaj kutunuz açık ise size bilgilendirme mesajı gelecektir.\n\n› **Örnek Görsel**`).setImage('https://cdn.discordapp.com/attachments/862028610231861298/868542530449453086/unknown.png'))
        }
        if(button.id === "yetkiatlanir") {
          await button.reply.think(true)
          await button.reply.edit(embed.setTitle('Terfi Sistemi ve Görev Sistemi Nedir?').setDescription(`Sunucumuz da yetki atlamak için hali hazırda **Upstaff** dediğimiz yani diğer adıyla Terfi (\`${sistem.prefix}yetki\`) sistemi bulunmaktadır.\nAyrıca sizin rolünüze uygun haftalık görevleriniz var ise \`${sistem.prefix}görev\` komutu ile görevlerinizi görüntüleyebilirsiniz. Sistem üzerinden ayrıca coin elde edebilirsiniz.\nSeste kaldıkça, mesaj attıkça, taglı görevi yaptıkça, davet görevi yaptıkça, kayıt yaptıkça sistem üzerinden belirli bir puan elde ederek otomatik olarak adil bir şekilde yetki atlamanıza yarar fakat Sesteyseniz kulaklığınız kapalı ise hiç bir şekilde puan alamazsınız veya da ses süreniz devam etmez ayrıca mikrofonunuz kapalıysa sizi AFK algılayıp örnek olarak 15 puan vericekse o puan 3/1 olarak bölünecektir. AFK odasında AFK olarak algılanırsanız 3/1 değil 3/2 olarak puan belirlenecektir. 2 Hafta içerisinde hiç bir etkinliğiniz olmaz ise otomatik olarak yetkiniz çekilir ayrıca Toplantı zamanları Mazeretli değilseniz 2 toplantıya üst üste katılmazsanız sistemsel olarak yetkiniz tekrardan çekilir.\n\n› **Örnek Görsel**`).setImage('https://cdn.discordapp.com/attachments/858711859460833313/868555498394386442/unknown.png'))
      }
      if(button.id === "kayitnasilyapilir") {
        await button.reply.think(true)
        await button.reply.edit(embed.setTitle('Doğru Kayıt Nasıl Yapılır?').setDescription(`\`1.\` Sunucumuz da doğru bir kayıt için öncelikle teyit kanalarında bulunmalısın ve gelen kayıtsız bir üyeye direk isim yaş sormak yerine onunla sohbet ederek ismini ve yaşını sormalısın.\n\`2.\` Kayıt yapmak için \`${sistem.prefix}kayıt <@sehira/ID> <İsim> <Yaş>\` komutu ile kayıt işlemine başlarsın orda konuştuğun üyenin cinsiyetini belirleyerek kayıt işlemini gerçekleştirirsin ve **3 Saniye** sonra  Sohbet odalarına otomatik olarak üyeyi taşıma işlemi yapar.\n\nTerfi sisteminde ki puanınıza (\`+${uPConf.odül.kayıt}\`) puan olarak ekler fakat kayıt ettiğiniz kişi kayıtsıza atılırsa veya sunucudan çıkarsa size verilen puan geri düşer.\n\n› **Örnek Görsel**`).setImage('https://cdn.discordapp.com/attachments/858711859460833313/868559175876223086/unknown.png'))
      }
      if(button.id === "davet") {
        await button.reply.think(true)
        await button.reply.edit(embed.setTitle('Nasıl Davet Edilir?').setDescription(`\`DAVET (Invite)\` Sunucumuza bir üye davet etmek için öncelikle davet bağlantısı almanız gerekmekte, aldığınız davet bağlantısını davet etmek istediğiniz üyeye atarak sunucuda davet işlemini gerçekleştirirsiniz veya da sunucumuzun resmine basılı tutarak \`İnsanları Davet Et\` buttonunu kullanarak, arkadaşlarını davet edebilirsin ve davet ettiğin üye sayısını öğrenmek için \`${sistem.prefix}invite\` komutunu kullanabilirsin.\n\n__**NOT**__: Davet ettiğiniz üye sunucudan ayrılırsa davetinizden üye miktarı düşer ve terfi sisteminden kazandığınız (\`+${uPConf.odül.invite}\`) puan da düşer.\n\n\n› **Örnek Görsel**`).setImage('https://cdn.discordapp.com/attachments/858711859460833313/868561114403860570/unknown.png'))
      }
      if(button.id === "taglı") {
        await button.reply.think(true)
        await button.reply.edit(embed.setTitle('Nasıl Taglı Kullanılır?').setDescription(`\`TAGLI (Tagged)\` Sunucumuz da davet ettiğin, kayıt ettiğin ve arkadaşlarını taga davet edebilirsin ettiğin arkadaşların ile puan kazanmak istemez misin? Ozaman \`${sistem.prefix}taglı <@sehira/ID>\` komutu ile taglı daveti gönderebilirsin ama ondan önce kesinlikle isminin ister başına ister sonuna \`${ayarlar.tag}\` sembolünü koymalıdır ayrıca taga davet ettiğin üyeleri \`${sistem.prefix}taglılarım\` komutu ile görüntüleyebilirsin.\n\n__**NOT**__: Taga davet ettiğiniz üye başına (\`+${uPConf.odül.taglı}\`) puan alırsınız ve tagı saldığında size verilen puan otomatik olarak geri düşer.\n\n› **Örnek Görsel**`).setImage('https://cdn.discordapp.com/attachments/858711859460833313/868564759115620352/unknown.png'))
      }
  });

  collector.on("end", async () => {
     //
  });
   
    }
};