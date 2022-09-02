"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLGPD = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
async function getLGPD(req, res) {
    logging_1.default.info(NAMESPACE, 'Update schedule result:');
    let params_patient_code = req.params.patient_code;
    (0, postgres_1.Connect)().then(async (data) => {
        let query = `SELECT des_acao FROM arq_paciente_autorizacao_dados WHERE cod_paciente = ${params_patient_code}`;
        const result = await data.query(query);
        return res.status(200).json({
            result
        });
    })
        .catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
}
exports.getLGPD = getLGPD;
;
//# sourceMappingURL=getLGPD.js.map