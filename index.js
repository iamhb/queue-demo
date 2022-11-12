const Queue = require('bull');
const { sendMail, sendMessage } = require('./sendMail');
const dummyUsers = require('./dummy-users.json');

const userNotificationQueue = new Queue('userNotification', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },

    // limit the number of jobs processed in a unit of time.
    // Here only one job in two sec
    // limiter: {
    //     max: 1,
    //     duration: 2000
    // }
});

const QueueOptions = {
    delay: 3000, // delay 3 sec, then start process

    // repeat jobs for every 10 sec for 2 times
    // repeat: {
    //     every: 10000,
    //     limit: 2
    // }
    // attempts: 1
};

logTime();
dummyUsers.length = 10; // limit users to 10

// adding named jobs to queue
dummyUsers.forEach(eachUser => {
    userNotificationQueue.add("MailQueue", eachUser, QueueOptions);
    userNotificationQueue.add("MessageQueue", eachUser, QueueOptions);
});

// processing named jobs
userNotificationQueue.process("MailQueue", async (job) => {
    logTime();
    console.log(`In mail process with JobId ${job.id}`);
    let { data } = job;
    sendMail(data.firstName, data.lastName, data.email);
});

// processing named jobs
userNotificationQueue.process("MessageQueue", async (job) => {
    logTime();
    console.log(`In message process with JobId ${job.id}`);
    let { data } = job;
    sendMessage(data.firstName, data.lastName, data.phone);
});

// log current time to see flow of operation
function logTime() {
    console.log(`${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`);
}
