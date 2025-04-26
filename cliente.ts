import * as net from "net";

interface BancadaProps {
  temperatura: number;
  umidade: number;
  condutividade: number;
  port: number;
}

const bancada: BancadaProps = {
  temperatura: 20,
  umidade: 10,
  condutividade: 20,
  port: 3001,
};

  const cliente: net.Socket = net.createConnection({
    host: "127.0.0.1",
    port: bancada.port,
  });

  cliente.on("data", (mensagem: Buffer) => {
    console.log(`Mensagem recebida do servidor ${mensagem.toString("utf-8")}`);
  });

  cliente.on("close", () => {
    console.log("Conexão fechada");
  });

  cliente.write(JSON.stringify(bancada), () => {
    console.log("O cliente enviou a mensagem");
  });

  cliente.end();
