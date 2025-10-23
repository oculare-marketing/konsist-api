"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicalSchedules = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const datetime = require('node-datetime');
const NAMESPACE = 'API';
const getMedicalSchedules = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Result Medical schedules:');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let dt = datetime.create();
        let DataFormatted = dt.format('Y-m-d');
        let TimeNow = Date();
        let DateNow = new Date(TimeNow);
        let NextYear = DateNow.getFullYear() + 1 + '-02-01';
        var PartsDate = DataFormatted.split("-");
        let params_id_doctor = req.params.doctor_id;
        let query = `SELECT aa.chave, tel.des_local, aa.id_medico, am.nom_medico, aa.dat_agenda, aa.des_hora FROM arq_agendal aa INNER JOIN arq_medico am ON am.id_medico = aa.id_medico LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local WHERE dat_agenda >= '${DataFormatted}' AND dat_agenda <= '${NextYear}'AND (aa.id_medico = '${params_id_doctor}') AND (aa.cod_paciente IS NULL AND COALESCE(aa.ind_status, ' ') <> 'B')`;
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Result Medical schedules: ', result);
        const results = result.sort(function (x, y) {
            let a = x.toString(x.dat_agenda);
            let b = x.toString(y.dat_agenda);
            return a - b;
        });
        return res.status(200).json({
            results
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getMedicalSchedules = getMedicalSchedules;
//# sourceMappingURL=getMedicalSchedules.js.map