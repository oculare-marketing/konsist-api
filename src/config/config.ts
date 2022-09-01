import dotenv from 'dotenv';

dotenv.config();

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'oculare';
const POSTGRES_USER = process.env.POSTGRES_HOST || 'if_desenvolvimento';
const POSTGRES_PASS = process.env.POSTGRES_HOST || '9f8w4la#';
const POSTGRES_UTF8 = process.env.POSTGRES_UTF8 || 'utf8';

const POSTGRES = {
	host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    pass: POSTGRES_PASS,
    client_encoding: POSTGRES_UTF8
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3333;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    postgres: POSTGRES,
    server: SERVER
};

export default config;