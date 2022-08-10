import { Channel, connect, Connection } from 'amqplib'

export class MessageBroker {
    private conn: Connection;
    private channel: Channel;

    constructor (private uri) {
    }

    async start (): Promise<void> {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    async consume (queue, callback) {
        return this.channel.consume(queue, (message) => {
            callback(message);
            this.channel.ack(message);
        });
    }
}