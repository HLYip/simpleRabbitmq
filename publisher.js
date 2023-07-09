const amqp = require("amqplib");
const msg = {number: process.argv[2]};
connect();


async function connect(){



    try{

        const connection = await amqp.connect("amqp://localhost:5672");
        
        const channel = await connection.createChannel();

        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log("message sent")

        await channel.close();
        await connection.close();


    }catch(err){

        console.log(err);
    }
}