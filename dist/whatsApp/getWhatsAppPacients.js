"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhatsAppPacients = void 0;
const postgres_1 = require("../config/postgres");
const logging_1 = __importDefault(require("../config/logging"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = require("dotenv");
const NAMESPACE = 'API';
const getWhatsAppPacients = async (req, res) => {
    const days = (parseInt(req.params.days) + 1).toString();
    const token = req.body.token;
    const filtered = req.body.filtered;
    (0, dotenv_1.config)();
    bcrypt_1.default.compare(process.env.PASSWORD, token, function (err, salt) {
        if (err) {
            throw err;
        }
        else if (salt) {
            (0, postgres_1.Connect)()
                .then(async (data) => {
                const query = `SELECT * FROM vw_informacoes_agenda WHERE dat_agenda = CURRENT_DATE + ${days};`;
                let result = await data.query(query);
                let finalResult = [];
                if (filtered) {
                    result.map(async (pat, index, list) => {
                        let last = 0;
                        let day;
                        const queryName = `SELECT * FROM arq_paciente WHERE nom_paciente_completo LIKE '%${pat.nom_paciente_completo}%'::varchar`;
                        const patComplete = await data.query(queryName);
                        const cod = patComplete[0].cod_paciente;
                        const queryCod = `SELECT aa.dat_agenda, aa.des_hora, am.nom_medico, tel.des_local, aa.cod_procedimento, aa.des_procedimento
                        FROM arq_agendal aa INNER JOIN arq_medico am ON am.id_medico = aa.id_medico LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local WHERE aa.cod_paciente = ${cod} AND COALESCE(aa.ind_status, ' ') IN (' ', 'A', 'M', 'C', 'L')`;
                        const appointments = await data.query(queryCod);
                        appointments.map((appointment) => {
                            const aux = new Date(appointment.dat_agenda).getTime();
                            if (last < aux) { // olha a ultima consulta do paciente e o ultimo medico dele
                                last = aux;
                                day = new Date(appointment.dat_agenda);
                            }
                        });
                        const today = new Date();
                        if (day !== undefined) {
                            const DifferenceInTime = day.getTime() - today.getTime();
                            const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
                            if (DifferenceInDays <= -360) {
                                finalResult.push(pat);
                            }
                        }
                        if (list.length === index + 1) {
                            return res.status(200).json({
                                finalResult
                            });
                        }
                    });
                }
                else {
                    finalResult = result;
                    return res.status(200).json({
                        finalResult
                    });
                }
            }).catch(error => {
                logging_1.default.error(NAMESPACE, error.message, error);
                return res.status(500).json({ message: error.message ? error.message : 'Something went Wrong' });
            }).finally();
        }
        else {
            return res.status(400).json('Invalid token');
        }
    });
};
exports.getWhatsAppPacients = getWhatsAppPacients;
//# sourceMappingURL=getWhatsAppPacients.js.map