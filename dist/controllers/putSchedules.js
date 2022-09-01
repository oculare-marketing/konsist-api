"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putSchedules = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const putSchedules = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Result schedules:');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let paramskey = req.params.key;
        console.log(paramskey);
        let query = `UPDATE arq_agendal SET ind_uso = TRUE WHERE chave = ${paramskey}`;
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Result schedules: ', result);
        const results = result[0];
        return res.status(200).json({
            results
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.putSchedules = putSchedules;
//# sourceMappingURL=putSchedules.js.map