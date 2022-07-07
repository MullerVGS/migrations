# Migrations


Projeto criado para rodar Migrations usando knex, para um banco de dados Postgres usando padrão de tenants/schemas


Para criar um arquivo de migration no padrão correto rodar o comando

Criar um sql no public:
```
npm run public
```

Criar um sql no schema:
```
npm run public
```

Para rodar as migrations é necessario criar um arquivo .env na pasta raiz do projeto no seguinte padrão:
```
USER = 'user'
HOST = 'host'
DATABASE = 'database'
PASSWORD = 'password'
PORT = 5432
```

Por fim basta rodar as migrations executando 

```
npm run migration
```
