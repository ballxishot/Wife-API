const { MessageEmbed } = require('discord.js')
const prefix = "!"; // your prefix

module.exports = {
    commands: 'kick', // You can use any command name/aliases.
    description: 'Kicks a member.', // Creates a command description.
    permissions: 'KICK_MEMBERS', // You can use any permission.
    permissionError: 'You dont have permission to kick members.',
    expectedArgs: `{prefix}kick @User`, // Backticks pleasse!

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('You need to mention a member to kick.') // Mention a member to kick.
        member.kick()

        const embed = new MessageEmbed()
        .setTitle('Kicked')
        .setDescription(`<@${member.user.id}> has been kicked.`)
        .addField('Kicked by', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}