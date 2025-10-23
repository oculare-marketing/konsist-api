"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersName = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const getUsersName = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Getting User by Name');
    let paramsName = req.params.name;
    let query = `SELECT * FROM arq_paciente WHERE nom_paciente_completo LIKE '%${paramsName}%'::varchar`;
    (0, postgres_1.Connect)()
        .then(async (data) => {
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Get user by Name: ', result);
        if (result[0] !== undefined) {
            return res.status(200).json({
                result
            });
        }
        else {
            return res.status(404).json({ Error: 'Name not found' });
        }
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getUsersName = getUsersName;
//# sourceMappingURL=getUserName.js.map