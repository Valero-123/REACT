import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('DB Config:', {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: console.log // Включим логирование SQL
    }
);

// Проверим подключение
try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;