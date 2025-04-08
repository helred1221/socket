import * as net from 'net'

interface Produto {
    titulo: string,
    preco: string
}

const produto: Produto = {
    titulo: 'sorvete',
    preco: '150 2kg'
}

const cliente: net.Socket = net.createConnection({
    host: '172.23.135.138',
    port: 3001
});

cliente.on('data', (mensagem: Buffer) => {
    console.log(`Mensagem recebida do servidor ${mensagem.toString('utf-8')}`);
});

cliente.on('close', () => {
    console.log('Conexão fechada');
});

cliente.write(JSON.stringify(produto), () => {
    console.log('Ain bolsonaro');
});

cliente.end();