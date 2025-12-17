export default class Inscricao {
  constructor(nome, email, whatsapp) {
    this.nome = nome;
    this.email = email;
    this.whatsapp = whatsapp;
    this.dataInscricao = new Date().toISOString();
  }
}