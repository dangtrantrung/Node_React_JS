'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('schedules', {
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
            currentNumber: {
                type: Sequelize.INTEGER
            },
            maxNumber: {
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            patientId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            timeType: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('schedules');
    }
};