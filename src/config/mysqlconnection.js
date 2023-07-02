const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hoidan', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
const connection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connection();