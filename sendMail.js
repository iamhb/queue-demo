function sendMail(firstName, lastName, mailId) {
    setTimeout(() => {
        console.log(`\nHi ${firstName} ${lastName}, \n Test mail for ${mailId} \n`);
    }, 1000)
}

function sendMessage(firstName, lastName, phone) {
    setTimeout(() => {
        console.log(`\nHi ${firstName} ${lastName}, \n Test text message for ${phone} \n`);
    }, 1000)
}


module.exports = { sendMail, sendMessage };