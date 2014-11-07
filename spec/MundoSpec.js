describe("Mundo", function  () {
  
  it("Deve ser incializável com qualquer tamanho", function  () {
    var mundo = new Mundo(2,2);
    expect(mundo).toBeDefined();

    mundo = new Mundo(3,10);
    expect(mundo).toBeDefined();
  });

  it("Após sua inicialização ele deve ser uma matriz de pontos", function  () {
    var mundo = new Mundo(2,2);
    expect(mundo.getMundo()).toEqual(
      ['..',
       '..']);

    mundo = new Mundo(5,10);
    expect(mundo.getMundo()).toEqual(
      [
      '..........',
      '..........',
      '..........',
      '..........',
      '..........'
      ]);
  });

  

});