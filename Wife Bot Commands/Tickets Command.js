const { MessageEmbed } = require('discord.js')
const prefix = "!"; // your prefix

module.exports = {
    commands: ['ticket', 'tick'], // You can change the command name here.
    description: 'Creates A Ticket Channel Using Comamnd', // Creates a channel description.
    expectedArgs: `{prefix}ticket`,  // Use backticks for this line because it has a string (the const prefix)

    callback: (message, args) => {

        const user = message.author // User who sent the command.

        message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                { // For the user who sent the command.
                    id: user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                { // For EveryOne In Server
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                { // For staff, add as many roles as you like by copying the format below
                    id: '846679016911142962',
                    allow: ['SEND_MESSAGES','VIEW_CHANNEL','MANAGE_MESSAGES','MANAGE_CHANNELS'] //Add As Many As You Like
                }
            ],
            type : 'text', parent: '810399250336186398' // Type = Channel Name | Parent = Category ID
        }).then(async channel => {
            channel.send(`<@${user.id}> Welcome!`, new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Welcome to your support ticket!')
            .setDescription('Please provide your issue here.')
            .setTimestamp()
            .setFooter(`Ticket made by ${user.username}#${user.discriminator}`)
            )
        })
    }
}