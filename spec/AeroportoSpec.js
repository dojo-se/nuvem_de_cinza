describe("Aeroporto", function  () {

  it("Deve ser capaz de se comparar Aeroporto", function  () {
    var aeroporto1 = new Aeroporto(0,0);
    var aeroporto2 = new Aeroporto(0,0);
    var aeroporto3 = new Aeroporto(1,1);

    expect(aeroporto1.equalTo(aeroporto2)).toBeTruthy();
    expect(aeroporto1.equalTo(aeroporto3)).toBeFalsy();
  });
})