const { acar, Mongo } = require('./Dist.Main.Client');
const client = global.client = new acar({ fetchAllMembers: true })

client.fetchCommands()
client.fetchEvents()
Mongo.Connect();

client.login(sistem.SECTOKENS.DISTMAIN);

