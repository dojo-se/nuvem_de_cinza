function Aeroporto(latitude, longitude){
  this.latitude  = latitude;
  this.longitude = longitude;
}


Aeroporto.prototype.getLatitude = function() {
  return this.latitude;
};

Aeroporto.prototype.getLongitude = function() {
  return this.longitude;
};

Aeroporto.prototype.toString = function() {
  return "A";
};

Aeroporto.prototype.equalTo = function(objeto) {
  if(objeto instanceof Aeroporto){
    if(objeto.getLatitude() == this.getLatitude() &&
      objeto.getLongitude() == this.getLongitude()){
      return true;
    }
  }
  return false;
};