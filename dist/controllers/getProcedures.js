"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcedures = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';
const getProcedures = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Procedures result:');
    (0, postgres_1.Connect)()
        .then(async (data) => {
        let query = `SELECT cod_procedimento, des_procedimento FROM tab_particular WHERE ind_ativo = TRUE`;
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Procedures result: ', result);
        return res.status(200).json({
            result
        });
    }).catch(error => {
        logging_1.default.error(NAMESPACE, error.message, error);
        console.log(error, req.params);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.getProcedures = getProcedures;
//# sourceMappingURL=getProcedures.js.map