describe("Mapa", function  () {
  
  it("Deve ser incializável com qualquer tamanho", function  () {
    var mapa = new Mapa(2,2);
    expect(mapa).toBeDefined();

    mapa = new Mapa(3,10);
    expect(mapa).toBeDefined();
  });


  it("Após sua inicialização ele deve estar no primeiro dia", function  () {
    var mapa = new Mapa(2,2);
    expect(mapa.getDia()).toEqual(1);

    mapa = new Mapa(3,10);
    expect(mapa.getDia()).toEqual(1);
  });

  it("Após sua inicialização ele deve ser uma matriz de outros objetos", function  () {
    var mapa = new Mapa(2,2);
    expect(mapa.toString()).toEqual(
"\
..\n\
..\n\
Dia 1"
      );

    var latitude = mapa.getMapa();

    for (var i = latitude.length - 1; i >= 0; i--) {
      var longitude = latitude[i];
      for (var j = longitude.length - 1; j >= 0; j--) {
        expect(longitude[j] instanceof Outros).toBeTruthy();
      };
    };



    mapa = new Mapa(5,10);
    expect(mapa.toString()).toEqual(
"\
..........\n\
..........\n\
..........\n\
..........\n\
..........\n\
Dia 1"
      );
    latitude = mapa.getMapa();
    for (var i = latitude.length - 1; i >= 0; i--) {
      var longitude = latitude[i];
      for (var j = longitude.length - 1; j >= 0; j--) {
        expect(longitude[j] instanceof Outros).toBeTruthy();
      };
    };

  });

  it("Deve ser capaz de adicionar nuvem em qualquer lugar do mapa", function  () {
    var mapa = new Mapa(5,10);
    var nuvem = new Nuvem(0,0, mapa);
    mapa.adicionarNuvem(nuvem);
    expect(mapa.getMapa()[0][0] instanceof Nuvem).toBeTruthy();
    expect(mapa.toString()).toEqual(
"\
*.........\n\
..........\n\
..........\n\
..........\n\
..........\n\
Dia 1"
);

    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.toString()).toEqual(
"\
*.........\n\
..........\n\
....*.....\n\
..........\n\
..........\n\
Dia 1"
);

    mapa.adicionarNuvem(new Nuvem(4,9,mapa));
    expect(mapa.getMapa()[4][9] instanceof Nuvem).toBeTruthy();
    expect(mapa.toString()).toEqual(
"\
*.........\n\
..........\n\
....*.....\n\
..........\n\
.........*\n\
Dia 1"
);

  });

  it("Deve adicionar aeroporto em qualquer lugar do mapa",function(){

    var mapa = new Mapa(5,10);

    mapa.adicionarAeroporto(new Aeroporto(0,0));
    expect(mapa.toString()).toEqual(
"\
A.........\n\
..........\n\
..........\n\
..........\n\
..........\n\
Dia 1"
);

    expect(mapa.getMapa()[0][0] instanceof Aeroporto).toBeTruthy();
    mapa.adicionarAeroporto(new Aeroporto(2,4));
    expect(mapa.toString()).toEqual(
"\
A.........\n\
..........\n\
....A.....\n\
..........\n\
..........\n\
Dia 1"
);

    expect(mapa.getMapa()[2][4] instanceof Aeroporto).toBeTruthy();

  });

  it("Deve avançar o dia", function(){
    var mapa = new Mapa(10,10);
    mapa.proximoDia();
    expect(mapa.getDia()).toEqual(2);
    mapa.proximoDia();
    expect(mapa.getDia()).toEqual(3);
    mapa.proximoDia();
    expect(mapa.getDia()).toEqual(4);
  });

  it("Quando o dia avançar a nuvem deve expandir", function(){
    var mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    expect(mapa.toString()).toEqual(
"\
..........\n\
..........\n\
....*.....\n\
..........\n\
..........\n\
Dia 1"
);
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.toString()).toEqual(
"\
..........\n\
....*.....\n\
...***....\n\
....*.....\n\
..........\n\
Dia 2"
);
    expect(mapa.getDia()).toEqual(2);
    expect(mapa.getMapa()[1][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[3][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][3] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][5] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();

    mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(0,0,mapa));
    expect(mapa.toString()).toEqual(
"\
*.........\n\
..........\n\
..........\n\
..........\n\
..........\n\
Dia 1"
);
    expect(mapa.getMapa()[0][0] instanceof Nuvem).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.toString()).toEqual(
"\
**........\n\
*.........\n\
..........\n\
..........\n\
..........\n\
Dia 2"
);
    expect(mapa.getDia()).toEqual(2);
    expect(mapa.getMapa()[0][0] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[1][0] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[0][1] instanceof Nuvem).toBeTruthy();

    mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(4,9,mapa));
    expect(mapa.toString()).toEqual(
"\
..........\n\
..........\n\
..........\n\
..........\n\
.........*\n\
Dia 1"
);
    expect(mapa.getMapa()[4][9] instanceof Nuvem).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.toString()).toEqual(
"\
..........\n\
..........\n\
..........\n\
.........*\n\
........**\n\
Dia 2"
);
    expect(mapa.getDia()).toEqual(2);
    expect(mapa.getMapa()[4][9] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[3][9] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[4][8] instanceof Nuvem).toBeTruthy();

  });



  it("Deve indicar a quantidade de dias que o primeiro aeroporto foi encoberto por nuvem",function () {
    var mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    mapa.adicionarAeroporto(new Aeroporto(2,5));
    expect(mapa.getDia()).toEqual(1);
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][5] instanceof Aeroporto).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][5] instanceof Nuvem).toBeTruthy();
    expect(mapa.getPrimeiroDia()).toEqual(2);
    expect(mapa.getQuantidadeDiasPrimeiroAeroporto()).toEqual(1);


    mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    mapa.adicionarAeroporto(new Aeroporto(2,6));
    expect(mapa.getDia()).toEqual(1);
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][5] instanceof Outros).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][5] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][6] instanceof Aeroporto).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][6] instanceof Nuvem).toBeTruthy();
    expect(mapa.getPrimeiroDia()).toEqual(3);
    expect(mapa.getQuantidadeDiasPrimeiroAeroporto()).toEqual(2);

    mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    mapa.adicionarAeroporto(new Aeroporto(2,6));
    mapa.adicionarAeroporto(new Aeroporto(4,8));
    expect(mapa.getDia()).toEqual(1);
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][5] instanceof Outros).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][5] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][6] instanceof Aeroporto).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][6] instanceof Nuvem).toBeTruthy();
    expect(mapa.getPrimeiroDia()).toEqual(3);
    expect(mapa.getQuantidadeDiasPrimeiroAeroporto()).toEqual(2);
    mapa.proximoDia();
    mapa.proximoDia();
    mapa.proximoDia();
    mapa.proximoDia();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][6] instanceof Nuvem).toBeTruthy();
    expect(mapa.getPrimeiroDia()).toEqual(3);
    expect(mapa.getQuantidadeDiasPrimeiroAeroporto()).toEqual(2);
  });

  it("Deve indicar quando o último aeroporto foi encoberto",function () {
    mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    mapa.adicionarAeroporto(new Aeroporto(2,6));
    mapa.adicionarAeroporto(new Aeroporto(4,8));
    mapa.adicionarAeroporto(new Aeroporto(4,9));
    expect(mapa.getDia()).toEqual(1);
    expect(mapa.getMapa()[2][4] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][5] instanceof Outros).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][5] instanceof Nuvem).toBeTruthy();
    expect(mapa.getMapa()[2][6] instanceof Aeroporto).toBeTruthy();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][6] instanceof Nuvem).toBeTruthy();
    expect(mapa.getPrimeiroDia()).toEqual(3);
    expect(mapa.getQuantidadeDiasPrimeiroAeroporto()).toEqual(2);
    mapa.proximoDia();
    mapa.proximoDia();
    mapa.proximoDia();
    mapa.proximoDia();
    mapa.proximoDia();
    expect(mapa.getMapa()[2][6] instanceof Nuvem).toBeTruthy();
    expect(mapa.getPrimeiroDia()).toEqual(3);
    expect(mapa.getQuantidadeDiasPrimeiroAeroporto()).toEqual(2);
    expect(mapa.getUltimoDia()).toEqual(8);

  })

  it("Deve dar a saida indicando o primeiro e ultimo dia que os aeroportos foram encobertos", function  () {
    var mapa = new Mapa(5,10);
    mapa.adicionarNuvem(new Nuvem(2,4,mapa));
    mapa.adicionarAeroporto(new Aeroporto(2,6));
    mapa.adicionarAeroporto(new Aeroporto(4,8));
    mapa.adicionarAeroporto(new Aeroporto(4,9));

    expect(mapa.calculaTempoEncobrimentoAeroportos()).toEqual("Primeiro dia - 3 / Ultimo dia - 8");
  })

});