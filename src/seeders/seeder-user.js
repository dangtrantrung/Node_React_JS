'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        return await queryInterface.bulkInsert('Users', [{
            email: 'doctor1@gmail.com',
            password: '1234534', //plain text ssssssssdffgfgg=>hash password store in DB
            firstName: 'BS A',
            lastName: 'Dang Tran Trung',
            address: 'VN',
            roleId: 'R1',
            positionId: 'P1',
            phonenumber: '0123447891',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    // Rollback
    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};