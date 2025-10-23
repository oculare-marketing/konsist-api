"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const datetime = require('node-datetime');
const NAMESPACE = 'API';
const putUser = async (req, res, next) => {
    const body = req.body;
    const { cod_paciente, mem_obs } = body;
    let query = `UPDATE arq_paciente SET mem_obs = '${mem_obs}' WHERE cod_paciente = ${cod_paciente}`;
    (0, postgres_1.Connect)()
        .then(async (data) => {
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'Update user result: ', result);
        return res.status(200).json({
            result: 'user updated successfully',
        });
    }).catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: 'Failed to update new user', error });
    });
};
exports.putUser = putUser;
//# sourceMappingURL=putUser.js.map