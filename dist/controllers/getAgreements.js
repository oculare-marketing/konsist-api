"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgreements = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const getAgreements = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Getting all agreements.');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let query = `SELECT tc.nom_convenio, tc.id_convenio FROM tab_convenio tc WHERE tc.ind_status = 'Ativo' AND COALESCE(tc.ind_oculto_atendimento, 'N') <> 'S'`;
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Result of all agreements: ', result);
        return res.status(200).json({
            result
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getAgreements = getAgreements;
//# sourceMappingURL=getAgreements.js.map