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
    (0, dotenv_1.config)();
    bcrypt_1.default.compare(process.env.PASSWORD, token, function (err, salt) {
        if (err) {
            throw err;
        }
        else if (salt) {
            (0, postgres_1.Connect)()
                .then(async (data) => {
                let query = `SELECT * FROM vw_informacoes_agenda WHERE dat_agenda = CURRENT_DATE + ${days};`;
                const result = await data.query(query);
                logging_1.default.info(NAMESPACE, 'Getting all agrements: ', result);
                return res.status(200).json({
                    result
                });
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