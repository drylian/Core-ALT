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

A função `db.del('campo', { valor: 'algo' })` deleta um valor dentro do JSON do campo selecionado.

## Uso do db.drop()

A função `db.drop('campo')` é utilizada para excluir completamente um campo do banco de dados.

## Uso do db.dropall()

A função `db.dropall('Chave do database')` deleta o banco de dados completamente. Um backup é carregado quando o banco de dados é deletado.

## Uso do db.exp()

A função `db.exp('campo', './local/do/arquivo.json')` é utilizada para exportar o JSON do campo especificado para fora do banco de dados. Pode ser usado para exportar dados para clientes.

## Uso do db.imp()

A função `db.imp('nome do campo', 'local/do/arquivo.json')` é utilizada para importar um JSON externo para dentro do banco de dados, onde o arquivo será inserido no campo selecionado.

### Exemplos de Uso

```js
const db = require('./JDB.js');

// Deletar um valor dentro do JSON do campo selecionado
db.del('campo', { valor: 'algo' });

// Excluir completamente um campo do banco de dados
db.drop('campo');

// Deletar o banco de dados completamente (backup é carregado)
db.dropall('Chave do database');

// Exportar o JSON do campo para um arquivo externo
db.exp('campo', './local/do/arquivo.json');

// Obter o JSON do campo selecionado
const campoData = db.get('campo');
console.log(campoData);

// Importar um JSON externo para dentro do banco de dados
db.imp('nome do campo', 'local/do/arquivo.json');
