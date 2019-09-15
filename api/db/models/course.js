'use strict'

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Title is required"
        },
        notNull: {
          msg: "Title property is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Description property is required"
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    materialsNeeded: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Course;
};
