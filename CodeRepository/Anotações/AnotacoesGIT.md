# Git

## Terminologia

#### Tracked e Untracked

- Tracked são os arquivos que o git tem ciencia.

    + Unmodified
        
            Arquivo que ainda não foi modificado

    + Modified
        
            Arquivo Unmodified que sofreu modificação

    + Staged

            Arquivos que estão se preparando para fazer parte de um commit

- Untracked são os arquivos que o git ainda não tem ciencia. 

Quando criamos um arquivo dentro do repositório este estará no estado **Untracked**. Ao adicionarmos com o comando *git add* tranformamos ele em um arquivo no estado **Staged**. Ao realizar um commit os arquivos que estavam **Staged** se transformam em **Unmodified**, ou seja, um arquivo que não foi modificado. Ao editar este arquivo **Unmodified** transformamos ele no estado **Modified** que por sua vez se for adicionado ao repositório ficará **Staged** aguardando o commit.

## Comandos

- git config --global user.email "rodolphoalcantara@outlook.com"
- git config --global user.name "Rodolpho Alcântara"

        Podemos settar configurações globais com a flag "--global" ou localmente no repositório

___
- git init

        Inicia um repositório na pasta em que foi chamado.
___
- git add

        Adiciona os arquivos alterados e os untracked (que não foi adicionado ainda).
___
- git commit 

        com a flag -m é pode-se passar uma mensagem para personalizar seu commit.
___
- git status

        mostra os status dos arquivos e seus estados.
___
 - git remote add origin https://enderecodorepositorioremoto

        faz com que seu repositório local se una com seu repositório remoto
___
 - git push origin master
    
        envia todos os commits e alterações para o repositório remoto

___
 - git pull origin master

        puxa todas as alterações e commits do repostirório remoto para o local.

