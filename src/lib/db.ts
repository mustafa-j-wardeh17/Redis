import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
});

client.on('error', err => console.log('Redis Client Error', err));

if (!client.isOpen) {
    await client.connect();
}


// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

export { client };