"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const getUsers = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Getting all users');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let query = 'SELECT * FROM arq_paciente';
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Getting all users: ', result);
        return res.status(200).json({
            result
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    }).finally();
};
exports.getUsers = getUsers;
//# sourceMappingURL=getUsers.js.map