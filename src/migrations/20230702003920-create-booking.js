'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Bookings', {
            /* statusId: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
            date: DataTypes.DATE,
            timeType: DataTypes.STRING, */
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            statusId: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Bookings');
    }
};