import * as net from 'net';

const porta: number = 3001;

interface ProdutoInterface {
  titulo: string,
  preco: number,
  descricao: string
}

class Produto implements ProdutoInterface {
  titulo: string = '';
  preco: number = 0;
  descricao: string = '';

  constructor(titulo: string, preco: number, descricao: string){
    this.titulo = titulo;
    this.preco = preco;
    this.descricao = descricao;
  }

  calcularDesconto(porcentagem: number) {
    return this.preco - ((this.preco * porcentagem) / 100);
  }

}

const servidor: net.Server = net.createServer((socket: net.Socket) => {
  console.log('Cliente conectado');

  socket.write("Bem-vindo ao servidor!\n");
  socket.write(`${socket.remotePort} - ${socket.remoteAddress}\n`);

  socket.on('data', (mensagem: Buffer) => {
    console.log(JSON.parse(mensagem.toString('utf-8')));
  })

  socket.on('close', () => {
    console.log('Cliente desconectado');
  })
})

servidor.listen(porta, () => {
  console.log(`Servidor escutando na porta ${porta}`);
})

