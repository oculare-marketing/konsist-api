"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarked = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const getMarked = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Marked patient result:');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let params_cod_patient = req.params.patient_code;
        let query = `SELECT aa.dat_agenda, aa.des_hora, am.nom_medico, tel.des_local, aa.cod_procedimento, aa.des_procedimento
      FROM arq_agendal aa INNER JOIN arq_medico am ON am.id_medico = aa.id_medico LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local WHERE aa.cod_paciente = ${params_cod_patient} AND COALESCE(aa.ind_status, ' ') IN (' ', 'A', 'M', 'C', 'L')`;
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Marked patient result: ', result);
        return res.status(200).json({
            result
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        console.log(error, req.params);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getMarked = getMarked;
//# sourceMappingURL=getMarked.js.map