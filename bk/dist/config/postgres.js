"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = exports.connection = void 0;
const initOptions = {};
const pgp = require('pg-promise')(initOptions);
const config_1 = __importDefault(require("./config"));
const params = {
    user: config_1.default.postgres.user,
    password: config_1.default.postgres.pass,
    host: config_1.default.postgres.host,
    database: config_1.default.postgres.database,
    client_encoding: config_1.default.postgres.client_encoding
};
exports.connection = pgp(params);
const Connect = async () => {
    return await pgp(params);
};
exports.Connect = Connect;
//# sourceMappingURL=postgres.js.map