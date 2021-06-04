const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Client({ ws: { intents:['GUILD_MEMBERS'] } });

const prefix = "!"; // your prefix
const guild = ""; // the guild id will make bot working on it only
const role = ""; // the staff role's id


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.author.bot || !message.guild || message.guild.id !== guild || !message.content.startsWith(prefix)) return;

  if (message.content.toLowerCase().startsWith(prefix + "staff")) {
    
    message.guild.members.fetch();

    var allstaff = message.guild.roles.cache.get(role).members.filter(m => m.presence.status === 'online').map(m => m.user);

    if (Object.keys(allstaff).length > 0) {
      message.channel.send(`The online staff members are: ${allstaff} (Pinged by: ${message.author.tag})`);
    } else {
      return message.channel.send(`There is no staff online at this moment, try again later.`);
    }

  }
}); // This command pings all the staff members that are online.

client.login(process.getenv);