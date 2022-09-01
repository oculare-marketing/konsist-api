"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsers = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const postgres_1 = require("../config/postgres");
const pgp = require('pg-promise')({
    capSQL: true
});
const datetime = require('node-datetime');
const NAMESPACE = 'API';
const createUsers = async (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Inserting user');
    let dt = datetime.create();
    let DataFormatted = dt.format('Y-m-d');
    let values = {
        nom_paciente: `${req.body.nom_paciente}`,
        dat_nascimento: `${req.body.dat_nascimento}`,
        des_sexo: `${req.body.des_sexo}`,
        des_endereco: `${req.body.des_endereco}`,
        des_bairro: `${req.body.des_bairro}`,
        num_cep: `${req.body.num_cep}`,
        num_ddd1: `${req.body.num_ddd1}`,
        num_telefone1: `${req.body.num_telefone1}`,
        num_ddd2: `${req.body.num_ddd2}`,
        num_telefone2: `${req.body.num_telefone2}`,
        num_ddd3: `${req.body.num_ddd3}`,
        num_telefone3: `${req.body.num_telefone3}`,
        nom_paciente_completo: `${req.body.nom_paciente_completo}`,
        des_email: `${req.body.des_email}`,
        num_cpf: `${req.body.num_cpf}`,
        dat_cadastro: `${DataFormatted}`,
        dat_atualizacao: `${DataFormatted}`,
        dat_inclusao: `${DataFormatted}`,
    };
    const columnset = new pgp.helpers.ColumnSet(['nom_paciente', 'dat_nascimento', 'des_sexo', 'des_endereco', 'des_bairro', 'num_cep', 'num_ddd1', 'num_telefone1', 'num_ddd2', 'num_telefone2', 'num_ddd3', 'num_telefone3', 'nom_paciente_completo', 'des_email', 'num_cpf', 'dat_cadastro', 'dat_atualizacao', 'dat_inclusao'], { table: 'arq_paciente' });
    (0, postgres_1.Connect)()
        .then(async (data) => {
        const query = pgp.helpers.insert(values, columnset);
        const resultBody = req.body;
        const result = await data.query(query);
        logging_1.default.info(NAMESPACE, 'user created: ', result);
        return res.status(200).json({
            result: 'user created successfully',
            resultBody
        });
    }).catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: 'Failed to create new user', error });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
    });
};
exports.createUsers = createUsers;
//# sourceMappingURL=createUsers.js.map