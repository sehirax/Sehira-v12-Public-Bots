const { Client, Message} = require("discord.js");
const children = require("child_process");

module.exports = {
    Isim: "pm2",
    Komut: ["pm2-controller"],
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
    function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
    if (args[0] === 'logs') return;
    const ls = children.exec(`pm2 ${args.join(' ')}`);
    ls.stdout.on('data', function (data) {
        message.channel.send(data,  { code: 'xl', split: true });
    });

    }
};