"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersCPF = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const datetime = require('node-datetime');
const NAMESPACE = 'API';
const getUsersCPF = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Getting CPF');
    let paramsCPF = req.params.cpf;
    let query = `SELECT * FROM arq_paciente WHERE num_cpf LIKE '%${paramsCPF}%'::varchar`;
    (0, postgres_1.Connect)()
        .then(async (data) => {
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Get user CPF: ', result);
        if (result[0] !== undefined) {
            return res.status(200).json({
                result
            });
        }
        else {
            return res.status(404).json({ Error: 'CPF not found' });
        }
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getUsersCPF = getUsersCPF;
//# sourceMappingURL=getUsersCPF.js.map