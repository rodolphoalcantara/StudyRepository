# Comandos

Criando uma Solução
```bash
    dotnet new sln -n NomeDaSolucao
```

Criando WebApi 
```bash
    dotnet new webapi -n NomeWebApi -o NomeDaSolucao.NomeWebApi
```

Criando Class Lib
```bash
    dotnet new classlib -n NomeClassLib -o NomeDaSolucao.NomeClassLib
```

Adicionando projetos na solução
```bash
    dotnet sln add .\NomeDaSolucao.NomeWebApi\
```

Adicionando referencias 
```bash
    dotnet add .\NomeDaSolucao.NomeClassLib\ reference .\NomeDaSolucao.NomeOutraClassLib\
```
