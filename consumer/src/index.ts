import express from 'express'
import { QUEUES } from './constants'
import { MessageBroker } from './message-broker'

const app = express()

app.use(express.json())

const broker = new MessageBroker('amqp://admin:admin@rabbitmq:5672')
broker.start().then(() => {
    broker.consume(QUEUES.notifications, (message) => {
        console.log("Message received")
        console.log("User: ", JSON.parse(message.content.toString()))
    })
})

app.listen(8080, () => console.log('Running on 8080'))