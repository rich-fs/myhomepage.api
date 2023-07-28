module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      index: true,
    },
    title: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Todo;
};