/**
 * Um vulcão acaba de entrar em erupção, provocando uma nuvem de cinzas que se
 * alastra impedindo a circulação aérea. 
 * O governo está muito preocupado e deseja saber quando que a nuvem de cinzas
 * irá atingir todos os aeroportos do país.
 * Está disponível um mapa detalhando a situação atual. O mapa é retangular, 
 * dividido em pequenos quadrados. 
 * Neste mapa existem três tipos de quadrados: nuvem (indicando que esta região
 * do mapa já está coberto por nuvens), 
 * aeroportos (indicando a localização de um aeroporto) e todas as outras
 * (indicando locais onde a nuvem ainda não chegou).
 * A cada dia, a nuvem expande-se um quadrado na horizontal e um quadrado na 
 * vertical. Ou seja, ao fim de cada dia, todos os quadrados adjacentes 
 * (vertical ou horizontalmente)
 * a uma nuvem, também passam a conter nuvens. Por exemplo:
 *   . . * . . . * *      . * * * . * * *     * * * * * * * *
 *   . * * . . . . .      * * * * . . * *     * * * * * * * *
 *   * * * . A . . A      * * * * A . . A     * * * * * . * *
 *   . * . . . . . .  ->  * * * . . . . .  -> * * * * . . . .
 *   . * . . . . A .      * * * . . . A .     * * * * . . A .
 *   . . . A . . . .      . * . A . . . .     * * * A . . . .
 *   . . . . . . . .      . . . . . . . .     . * . . . . . .
 *       Dia 1                Dia 2               Dia 3
 * Para preparar os planos de contingência, o governo necessita saber:
 * quantos dias demorará para ao menos um aeroporto ficar coberto pelas nuvens
 * e daqui quantos dias todos os aeroportos estarão cobertos pelas nuvens.
 * Dados um quadriculado com L linhas e C colunas, além da indicação inicial
 * das nuvens e dos aeroportos, desenvolva uma programa que informe o número de 
 * dias até um primeiro aeroporto ficar debaixo da nuvem de cinzas e o número de 
 * dias até que todos os aeroportos ficarem cobertos pelas cinzas.
 * 
 */

function Mapa(altura, largura){

  this.mapa = Array(altura);
  this.aeroportos = Array();
  this.nuvens = Array();
  this.dia = 1;
  this.primeiro_dia = null;
  this.ultimo_dia = null;

  for (var i = 0; i < altura ; i++) {
    this.mapa[i] = Array(largura);
    for (var j = 0; j < largura; j++) {
      this.mapa[i][j] = new Outros(i, j, this); 
    }
  }
}

Mapa.prototype.getMapa = function() {
  return this.mapa
};


Mapa.prototype.getDia = function() {
  return this.dia;
};

Mapa.prototype.getPrimeiroDia = function() {
  return this.primeiro_dia;
};

Mapa.prototype.getQuantidadeDiasPrimeiroAeroporto = function() {
  return this.primeiro_dia -1;
};

Mapa.prototype.getUltimoDia = function() {
  return this.ultimo_dia;
};

Mapa.prototype.adicionarNuvem = function(nuvem){
  var latitude = nuvem.getLatitude();
  var longitude = nuvem.getLongitude();
  if(latitude >= 0 && latitude < this.mapa.length
    && longitude >= 0 && longitude < this.mapa[0].length){
    var item_mapa = this.mapa[latitude][longitude];
    if(!(item_mapa instanceof Nuvem)){
      if(item_mapa instanceof Aeroporto){
        if(this.primeiro_dia == null){
          this.primeiro_dia = this.dia;
        }
        this.removerAerporto(item_mapa);
        if(this.aeroportos.length == 0){
          this.ultimo_dia = this.dia;
        }
      }
      this.mapa[latitude][longitude] = nuvem;
      this.nuvens.push(nuvem);
    }
  }
};

Mapa.prototype.adicionarAeroporto = function(aeroporto) {
  var latitude = aeroporto.getLatitude();
  var longitude = aeroporto.getLongitude();
   if(!(this.mapa[latitude][longitude] instanceof Aeroporto)){
    this.mapa[latitude][longitude] = aeroporto;
    this.aeroportos.push(aeroporto);
  }
};

Mapa.prototype.removerAerporto = function(aeroporto) {
  var aeroportos = Array();
  for (var i = this.aeroportos.length - 1; i >= 0; i--) {
    if(!this.aeroportos[i].equalTo(aeroporto)){
      aeroportos.push(this.aeroportos[i]);
    }
  };
  this.aeroportos = aeroportos;
};

Mapa.prototype.toString = function() {
  var mapa_string = "";
  for (var i = 0; i < this.mapa.length; i++) {
    for (var j = 0; j < this.mapa[i].length; j++) {
      mapa_string += this.mapa[i][j].toString();
    };
    mapa_string += "\n";
  };
  mapa_string += "Dia " + this.dia;
  return mapa_string;
};

Mapa.prototype.proximoDia = function() {
  this.dia++;
  nuvens = this.nuvens.slice(0);
  for (var i = 0; i < nuvens.length; i++) {
    var nuvem =  nuvens[i];
    nuvem.expandir();
  };
};


Mapa.prototype.calculaTempoEncobrimentoAeroportos = function() {
  while(this.ultimo_dia == null){
    this.proximoDia();
  }

  return "Primeiro dia - " + this.primeiro_dia + " / Ultimo dia - " + this.ultimo_dia;
};
