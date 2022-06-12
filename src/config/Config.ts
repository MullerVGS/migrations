import * as dotenv from 'dotenv';
dotenv.config();
export default {
    database: {
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    },
}