"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLGPD = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
async function postLGPD(req, res) {
    logging_1.default.info(NAMESPACE, 'Update schedule result:');
    let params_patient_code = req.params.patient_code;
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let query = `INSERT INTO arq_paciente_autorizacao_dados (cod_paciente, int_origem_aceite, des_acao) VALUES (${params_patient_code}, 1, 'ACEITE');`;
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
exports.postLGPD = postLGPD;
;
//# sourceMappingURL=postLGPD.js.map