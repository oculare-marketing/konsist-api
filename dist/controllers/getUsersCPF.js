"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersCPF = void 0;

const logging_1 = __importDefault(require("../config/logging"));
const { Connect } = require("../config/postgres");
const jwt = require("jsonwebtoken");

const NAMESPACE = "API";
const SECRET_KEY = process.env.JWT_SECRET || "EX&,wKPRSthH9o.bj@m>f$lqh}E82^tH!P8s/nu$b5roo%GnMZ";

// 🧱 Domínios autorizados
const ALLOWED_ORIGINS = [
  "https://portaldopaciente.oculareoftalmo.med.br",
  "http://127.0.0.1", // para testes locais
  "http://localhost"
];

const getUsersCPF = async (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "";
  logging_1.default.info(NAMESPACE, "Request from origin:", origin);

  // Bloqueia acesso direto fora do domínio autorizado
  const isAuthorized = ALLOWED_ORIGINS.some((domain) => origin.startsWith(domain));
  if (!isAuthorized) {
    return res.status(403).json({ message: "Acesso não autorizado" });
  }

  logging_1.default.info(NAMESPACE, "Getting CPF");
  let paramsCPF = req.params.cpf;
  let query = `SELECT * FROM arq_paciente WHERE num_cpf LIKE '%${paramsCPF}%'::varchar`;

  Connect()
    .then(async (data) => {
      const result = await data.query(query);
      logging_1.default.info(NAMESPACE, "Get user CPF: ", result);

      if (result[0] !== undefined) {
        // Gera token automático invisível para o usuário
        const paciente = result[0];
        const token = jwt.sign(
          {
            cpf: paciente.num_cpf,
            id: paciente.cod_paciente || paciente.id_paciente || null,
            nome: paciente.nom_paciente || null,
          },
          SECRET_KEY,
          { expiresIn: "20m" }
        );

        // Retorna dados + token apenas para o front autorizado
        return res.status(200).json({
          token,
          result,
        });
      } else {
        return res.status(404).json({ Error: "CPF not found" });
      }
    })
    .catch((error) => {
      logging_1.default.error(NAMESPACE, error.message, error);
      return res
        .status(500)
        .json({ message: error.message ? error.message : "Something went Wrong" });
    });
};

exports.getUsersCPF = getUsersCPF;