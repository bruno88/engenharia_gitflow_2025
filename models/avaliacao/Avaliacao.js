export default class Avaliacao {
  constructor(nomeUsuario, nota, comentario) {
    this.nomeUsuario = nomeUsuario;
    this.nota = nota; // 1 a 5
    this.comentario = comentario;
    this.data = new Date().toISOString();
  }
}
