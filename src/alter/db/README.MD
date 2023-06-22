# Alternight JDB 2023

O Alternight JDB 2023 é um sistema de armazenamento de dados que utiliza a criptografia para armazenar campos em formato JSON.

## Lógica de Campo

Um campo equivale a um "json", contendo todo o seu conteúdo criptografado.

## Lógica de Chave

A chave é uma função dentro do JSON que define um par chave-valor, onde a chave é "algo" e o valor é "valor".

## Uso do db.set()

A função `db.set('campo', {chave: 'valor'})` é utilizada para definir um campo no banco de dados, com a respectiva chave e valor.

## Uso do db.get()

A função `db.get('campo')` é utilizada para obter o JSON do campo especificado. Se a chave for definida como "all", serão retornados os dados de todo o banco de dados.

## Uso do db.del()

A função `db.del('campo', 'chave')` é utilizada para excluir uma chave específica dentro do campo. É possível fornecer um caminho mais específico, por exemplo, `db.del('campo', 'chave:algo')`, para deletar uma chave aninhada dentro do campo.

## Uso do db.drop()

A função `db.drop('campo')` é utilizada para excluir completamente um campo do banco de dados.

## Uso do db.exp()

A função `db.exp('campo', './arquivo.json')` é utilizada para exportar os dados do campo especificado para um arquivo externo. O formato de exportação é limitado a ".json".

## Uso do db.imp()

A função `db.imp('campo', './arquivo.json')` é utilizada para importar dados de um arquivo externo para o banco de dados interno. O formato de importação é limitado a ".json".

## Uso do db.dropall()

**AVISO: Esta lógica irá criar um backup e zerar completamente o banco de dados, criando um novo banco de dados vazio.**

A função `db.dropall('chave do database')` é utilizada para criar um backup e zerar completamente o banco de dados, criando um novo banco de dados vazio.

```js
const teste = require('teste')
```
