/**
 * SequelizeController Migrations
 * Controlador de todos os Migrations gerados em 16/ago./2023 22:55:05
 * Total de Migrations = 2
 */

function Migrations() {
/**
 * Function Gerada pelo SequelizeController.
 * Json Migration "Transactions" convertido para função. 
 * Migration Versão: 1.0
 * Migration Descrição: Template de Model
 * Migration Tipo: @MergeModels
 */

const Transactions = () => {
  const TransactionsContent = sequelize.define('Transactions', {
      source: {
        type: DataTypes.INTEGER,
      },
      given_by: {
        type: DataTypes.STRING,
      },
      received_by: {
        type: DataTypes.STRING,
      },
      given_by_tag: {
        type: DataTypes.STRING,
      },
      received_by_tag: {
        type: DataTypes.STRING,
      },
      given_at: {
        type: DataTypes.BIGINT,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
 })
  return TransactionsContent;
};


/**
 * Function Gerada pelo SequelizeController.
 * Json Migration "User" convertido para função. 
 * Migration Versão: 1.4
 * Migration Descrição: Model para os usuários
 * Migration Tipo: @MergeModels
 */

const User = () => {
  const UserContent = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        defaultValue: 1,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remember: {
        type: DataTypes.STRING,
      },
 })
  return UserContent;
};


  return { Transactions, User };
}
