const initOptions = {}
const pgp = require('pg-promise')(initOptions);
import config from './config';

const params = {
    user: config.postgres.user,
    password: config.postgres.pass,
    host: config.postgres.host,
    database: config.postgres.database,
    client_encoding: config.postgres.client_encoding
};  
  
export const connection = pgp(params);
const Connect = async () => {
    return await pgp(params);      
};
export {Connect};