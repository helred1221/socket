import * as net from "net";

const porta: number = 3001;

interface BancadaProps {
  temperatura: number;
  umidade: number;
  condutividade: number;
  port: number;
}

class Bancada implements BancadaProps {
  temperatura: number = 0;
  umidade: number = 0;
  condutividade: number = 0;
  port: number = 0;

  constructor(
    temperatura: number,
    umidade: number,
    condutividade: number,
    port: number
  ) {
    this.temperatura = temperatura;
    this.umidade = umidade;
    this.condutividade = condutividade;
    this.port = port;
  }

  getTemperatura(): number {
    return this.temperatura;
  }

  getUmidade(): number {
    return this.umidade;
  }

  getCondutividade(): number {
    return this.condutividade;
  }
}

const servidor: net.Server = net.createServer((socket: net.Socket) => {
  console.log("Cliente conectado");

  socket.write("Bem-vindo ao servidor!\n");
  socket.write(`${socket.remotePort} - ${socket.remoteAddress}\n`);

  socket.on("data", (mensagem: Buffer) => {
    console.log(JSON.parse(mensagem.toString("utf-8")));
  });

  socket.on("close", () => {
    console.log("Cliente desconectado");
  });
});

servidor.listen(porta, () => {
  console.log(`Servidor escutando na porta ${porta}`);
});
