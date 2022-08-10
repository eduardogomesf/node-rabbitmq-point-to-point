import { Router } from "express"
import { EXCHANGES, QUEUES } from "./constants.js"
import { MessageBroker } from "./message-broker.js"

const router = Router()

const broker = new MessageBroker('amqp://admin:admin@rabbitmq:5672')
broker.start()

const users = []

router.post('/users', async (request, response) => {
    const { name, email, age } = request.body

    users.push({ name, email, age })

    await broker.publishInExchange(EXCHANGES.direct, QUEUES.notifications.routingKey, JSON.stringify({ name, email }))

    return response.status(201).json('User created')
})

export {
    router
}