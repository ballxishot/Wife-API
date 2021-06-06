const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'ban', // You can keep the command name and change any aliases.
    description: 'Bans a user.', // Creates a channel description. 
    permissions: 'BAN_MEMBERS', // You can create any permission for this command.
    permissionError: 'You dont have permission to ban members', // Makes a permission to use the command.
    expectedArgs: `{prefix}ban @User`, // Backticks Please!!

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('You need to mention a member to ban.') // Mention a member.
        member.ban()

        const embed = new MessageEmbed()
        .setTitle('Ban')
        .setDescription(`<@${member.user.id}> has been banned.`)
        .addField('Banned by', message.author)
        .setColor('RED')
        message.channel.send(embed)
    }
}

const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unban', 'ub'], // Choose any name or aliases.
    description: 'Unbans A User Using Its ID',  // Creates a command description.
    permissions: 'BAN_MEMBERS', // Makes a permission to use the command.
    permissionError: 'You dont have permission to unban members.',
    expectedArgs: `{prefix}unban User-ID`, // Backticks pleasse!

    callback: (message, args) => {

        const userID = args[0]
        if(!userID) return message.reply('You need to send an ID to unban this member.') // If the player doesn't send an ID.

        // Check if user is banned
        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if(bannedUser) { // If the member is banned the bot will unban the member.

                const embed =  new MessageEmbed()
                .setTitle('Unbanned')
                .setDescription(`<@${userID}> has been unbanned`)
                .addField('Unbanned By:-', message.author)
                .addField('User ID:-', userID)
                .setColor('AQUA')

                message.channel.send(embed).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.reply('Invalid banned user idea.') // If member is not banned.
            }
        })


    }
}