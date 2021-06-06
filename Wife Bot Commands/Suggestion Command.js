const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
    const suggestinChannel = client.channels.cache.get('789977994004529163') // Change the channel for suggestions (It is the channel ID).
    client.on('message', message => {
        if(message.channel === suggestinChannel) {
            if(message.author.bot) return 
            message.delete() // Deletes original message by the member.

            const embed = new MessageEmbed()
            .setColor('AQUA')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
            .setDescription(`${message.content}`)
            .setFooter('Have something to suggest? Then just type your suggestion here.')
            message.channel.send(embed).then(message => { // Reactions
                message.react(':yes:') // Change the image to react to the suggestion.
                message.react(':no:') // Change the image to react to the suggestion.
            })
        }
    })
}