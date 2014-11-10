function Outros(latitude, longitude){
  this.latitude  = latitude;
  this.longitude = longitude;
}


Outros.prototype.getLatitude = function() {
  return this.latitude;
};

Outros.prototype.getLongitude = function() {
  return this.longitude;
};

Outros.prototype.toString = function() {
  return ".";
};