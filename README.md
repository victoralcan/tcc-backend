# tcc-backend

O projeto utiliza o Node em sua versão LTS e utilizamos o Yarn como gerenciador de pacotes.

Ao clonar o projeto, dê um `yarn`, para instalar as dependências. 

Agora, é hora de subir o banco. Neste projeto, utilizamos PostgreSQL. Você pode instalar o banco da forma que preferir, 
desde que o usuário seja `postgres`, a senha `docker` e a database `tcc`, rodando na porta `5432`. Eu utilizo Docker para isso. Quem quiser utilizar também, 
o comando Docker para iniciar o banco é `docker run --name postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -e POSTGRES_DB=tcc -p 5432:5432 -d postgres`.

Com o banco de pé, digite `yarn setup` no projeto. Se nenhum erro aparecer, deu tudo certo. Agora, é só subir a aplicação com o comando `yarn dev:server`.

Para as próximas vezes que for subir o projeto, é só digitar `yarn dev:server` para subir a aplicação. Caso precise zerar o banco, delete ele e repita o processo desse readME.

