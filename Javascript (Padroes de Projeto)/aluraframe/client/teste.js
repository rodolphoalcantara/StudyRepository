let funcionario = new Proxy({ email: 'abc@abc.com.br'}, {
    get: function(target, prop, receiver){
      console.log(`Armadilha aqui`)
      return `**${target[prop]}**`
    }
});

console.log(funcionario.email); 