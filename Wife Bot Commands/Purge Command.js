module.exports ={
    name: 'purge',
    description: 'Deletes messages', // Creates a command description
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.channel.send('Please enter an amount to purge.')
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send('You can only delete upto 100 messages at a time.')
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error when deleting the messages.')
        })
    }
}