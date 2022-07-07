import * as dotenv from 'dotenv';
const path = require('path')
let resolvedPath;

switch (process.env.NODE_ENV) {
  case "staging":
    resolvedPath = path.resolve(__dirname, '../../.env.staging');
    break;
  case "prod":
    resolvedPath = path.resolve(__dirname, '../../.env.prod');
    break;
  default:
    resolvedPath = path.resolve(__dirname, '../../.env');
}
console.log(resolvedPath);
dotenv.config({ path: resolvedPath });

export default {
    database: {
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    },
}