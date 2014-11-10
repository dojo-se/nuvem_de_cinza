function Nuvem(latitude, longitude, mapa){
  this.latitude  = latitude;
  this.longitude = longitude;
  this.mapa      = mapa;
}


Nuvem.prototype.getLatitude = function() {
  return this.latitude;
};

Nuvem.prototype.getLongitude = function() {
  return this.longitude;
};

Nuvem.prototype.getMapa = function() {
  return this.mapa;
};

Nuvem.prototype.toString = function() {
  return "*";
};

Nuvem.prototype.expandir = function() {
  this.mapa.adicionarNuvem(new Nuvem(this.latitude -1, this.longitude, this.mapa));
  this.mapa.adicionarNuvem(new Nuvem(this.latitude +1, this.longitude, this.mapa));
  this.mapa.adicionarNuvem(new Nuvem(this.latitude, this.longitude -1, this.mapa));
  this.mapa.adicionarNuvem(new Nuvem(this.latitude, this.longitude +1, this.mapa));
};