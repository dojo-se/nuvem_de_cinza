function Mundo(altura, largura){

  this.mundo = Array(altura);

  for (var i = 0; i < altura ; i++) {
    this.mundo[i] =  Array(largura +1).join('.');
  }
}

Mundo.prototype.getMundo = function() {
  return this.mundo
};