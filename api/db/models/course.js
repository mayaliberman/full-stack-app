'use strict';

const Sequelize = require('sequelize');


//Creating the Course module which contains id, title, description, estimated time needed and materials needed
module.exports = sequelize => {
  class Course extends Sequelize.Model {}
  Course.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    { sequelize }
  );


  //Course is belong to one user in relationship of one to many. User id is a foregin key of a course.
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    });
  };
  return Course;
};
