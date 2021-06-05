const prefix = "!"; // your prefix
const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['mute', 'm'], 
    description: 'Mutes a member.', // Creates a description of the command
    permissions: 'BAN', // Make permissions here
    permissionError: 'You dont have permission to mute members', 
    expectedArgs: `{prefix}mute @User`,  // Use backticks for this line because it has a string (the const prefix)

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Please mention a user to mute.')
        if(member.roles.cache.has('801728021438005288')) return message.reply('Member is already muted.') // Checks if member is muted or has the muted role.
        member.roles.add('801728021438005288') // Change the ID to your muted role ID

        const embed = new MessageEmbed()
        .setTitle('Mute')
        .setDescription(`<@${member.user.id}> has been muted.`)
        .addField('Muted by', message.author)
        .setColor('red')
        message.channel.send(embed)
    }
}



module.exports = {
    commands: ['unmute', 'um'], // You can create any name/aliases.
    description: 'Unmutes a member.', // Creates a command description
    permissions: 'BAN', // You can use any permission.
    permissionError: 'You dont have permission to unmute members.',
    expectedArgs: `{prefix}unmute @User`, // Use backticks for this line because it has a string (the const prefix).

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Please Mention A User To Mute.')
        member.roles.remove('801728021438005288') // Removes Mute Role to User
        if(!member.roles.cache.has('801728021438005288')) return message.reply('User Is Already Unmuted.') // If User Is Already Unmuted.

        const embed = new MessageEmbed()
        .setTitle('Unmute')
        .setDescription(`<@${member.user.id}> is now unmuted.`)
        .addField('Unmuted by', message.author)
        .setColor('aqua')
        message.channel.send(embed)
    }
}

const ms = require('ms') // npm i ms

module.exports = {
    commands: ['tempmute', 'tempm'], // You can use any name or aliases
    description: 'Temp Mutes A User.', // Creates a channel description
    permissions: 'BAN', // You can use any permission
    permissionError: 'You dont have permission to tempmute members.',
    expectedArgs: `{prefix}tempmute @User`, // Use backticks for this line because theres a string (const prefix).

    callback: async(message, args) => {
        const member = message.mentions.members.first()
        member.roles.add('801728021438005288')
        const time = args[1]
        if(!member) return message.reply('Mention a member to unmute.')
        if(!time) return message.reply('Specify a time.')

        if(member.roles.cache.has('801728021438005288')) return message.reply('User Is Already Muted.') // If User Is Already muted.
        await member.roles.add('801728021438005288')

        const embed = new MessageEmbed()
        .setTitle('Mute')
        .setDescription(`<@${member.user.id}> is muted for ${time}.`)
        .addField('Muted by', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)

        // Removes role after punishment has finished
        setTimeout(async () => {
            await member.roles.remove('801728021438005288')
            message.channel.send(`<@${member.user.id}> is unmuted.`)
        }, ms(time))
    } 
}
