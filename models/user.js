module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
  indexes: [
    {
      name: 'unique_username',
      unique: true,
      fields: ['username']
    }]
  });

  return User;
};