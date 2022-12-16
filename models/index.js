const User = require('./User');
const Project = require('./Project');
const Pledge = require('./Pledge');

User.hasMany(Project);

Project.belongsTo(User, {
    foreignKey: 'creatorId',
});

User.belongsToMany(Project, { through: Pledge });
Project.belongsToMany(User, { through: Pledge });

module.exports = {
    User,
    Project,
};