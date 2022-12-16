const { Model, DataTypes } = require("sequelize");

const sequelize = require('../config/connection');

class Project extends Model {};

Project.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        goal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fundBy: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
    },
);

module.exports = Project;