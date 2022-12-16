const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Pledge extends Model {}

Pledge.init(
    {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
    },
);

module.exports = Pledge;