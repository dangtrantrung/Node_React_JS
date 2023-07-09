'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('histories', {
            /* id: DataTypes.STRING,
            email: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            address: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            roleid: DataTypes.STRING */
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            files: {
                type: Sequelize.TEXT
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('histories');
    }
};