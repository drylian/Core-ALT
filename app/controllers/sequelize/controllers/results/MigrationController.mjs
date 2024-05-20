/**
 * SequelizeController Migrations
 * Controlador de todos os Migrations gerados em 19/mar./2024 22:05:30
 * Total de Migrations = 1
 */

function Migrations() {
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


  return { User };
}
