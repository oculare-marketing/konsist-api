"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const getFiles = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Result of Patient Files:');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let params_cod_patient = req.params.patient_code;
        let query = `SELECT A.id_arquivo_paciente, A.dat_arquivo, A.nom_arquivo, A.des_arquivo, A.dat_atendimento, D.nom_medico, B.des_extensao_imagem FROM arq_arquivos_paciente A LEFT JOIN arq_imagens B ON   A.id_imagem = B.id_imagem LEFT JOIN arq_medico D ON A.id_medico = D.id_medico WHERE A.cod_paciente = ${params_cod_patient} AND A.ind_excluido = FALSE ORDER BY A.dat_atendimento DESC, id_arquivo_paciente DESC`;
        const results = await data.query(query);
        let lastYear = results[0].dat_arquivo.getFullYear();
        let fileName = [];
        results.map((result) => {
            if (result.dat_arquivo.getFullYear() === lastYear) {
                const filtered = {
                    id_arquivo_paciente: result.id_arquivo_paciente,
                    dat_arquivo: result.dat_arquivo,
                    nom_arquivo: result.nom_arquivo,
                    des_arquivo: result.des_arquivo,
                    dat_atendimento: result.dat_atendimento,
                    nom_medico: result.nom_medico,
                    des_extensao_imagem: result.des_extensao_imagem
                };
                fileName.push(filtered);
            }
        });
        console.log(fileName);
        return res.status(200).json({
            files: fileName
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        console.log(error, req.params);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getFiles = getFiles;
//# sourceMappingURL=getFiles.js.map