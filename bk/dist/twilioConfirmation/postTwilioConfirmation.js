// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.postTwilioConfirmation = void 0;
// const logging_1 = __importDefault(require("../config/logging"));
// const NAMESPACE = 'API';
// const postTwilioConfirmation = async (req, res) => {
//     logging_1.default.info(NAMESPACE, 'Confirmation');
//     const body = req.body;
//     const { To, Code } = body;
//     const accountSid = "AC25edda61a3959bdefd25648f107d8f50";
//     const authToken = "98066e9ab073d6c4abaa4c13dfb8d60c";
//     const client = require('twilio')(accountSid, authToken);
//     client.verify.services('VA16b3a308136191c996df2328deee32a2')
//         .verificationChecks
//         .create({ to: To, code: Code })
//         .then((verification_check) => {
//         const data = verification_check.status;
//         console.log(verification_check.status);
//         res.status(200).json(data);
//     })
//         .catch((error) => {
//         const status = error.status;
//         const data = error;
//         res.status(status).json(data);
//     });
// };
// exports.postTwilioConfirmation = postTwilioConfirmation;
// //# sourceMappingURL=postTwilioConfirmation.js.map


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTwilioConfirmation = void 0;

const logging_1 = __importDefault(require("../config/logging"));
const jwt = require('jsonwebtoken');
const postgres = require('../config/postgres'); // ajuste se sua conexão for diferente
const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';

const NAMESPACE = 'API';

const postTwilioConfirmation = async (req, res) => {
    logging_1.default.info(NAMESPACE, 'Confirmation');

    const body = req.body;
    const { To, Code } = body;

    const accountSid = "AC25edda61a3959bdefd25648f107d8f50";
    const authToken = "98066e9ab073d6c4abaa4c13dfb8d60c";
    const client = require('twilio')(accountSid, authToken);

    client.verify.services('VA16b3a308136191c996df2328deee32a2')
        .verificationChecks
        .create({ to: To, code: Code })
        .then(async (verification_check) => {
            const data = verification_check.status;
            console.log(verification_check.status);

            if (data === 'approved') {
                try {
                    const db = await postgres.connect();
                    const query = `
                        SELECT cod_paciente, nom_paciente 
                        FROM arq_paciente 
                        WHERE num_telefone1 = $1 OR num_telefone2 = $1 OR num_telefone3 = $1
                    `;
                    const result = await db.query(query, [To]);

                    if (result.rows.length > 0) {
                        const patient = result.rows[0];
                        const token = jwt.sign(
                            { patient_id: patient.cod_paciente, nome: patient.nom_paciente },
                            SECRET_KEY,
                            { expiresIn: '1h' }
                        );

                        return res.status(200).json({ status: data, token });
                    } else {
                        return res.status(404).json({ message: 'Paciente não encontrado' });
                    }
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Erro ao gerar token' });
                }
            }

            // Se não for aprovado, retorna como antes
            res.status(200).json(data);
        })
        .catch((error) => {
            const status = error.status;
            const data = error;
            res.status(status).json(data);
        });
};

exports.postTwilioConfirmation = postTwilioConfirmation;
