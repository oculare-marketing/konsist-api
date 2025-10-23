"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicalSchedules = void 0;

const logging_1 = __importDefault(require("../config/logging"));
const { Connect } = require("../config/postgres");
const jwt = require("jsonwebtoken");
const datetime = require("node-datetime");

const NAMESPACE = "API";
const SECRET_KEY = process.env.JWT_SECRET || "EX&,wKPRSthH9o.bj@m>f$lqh}E82^tH!P8s/nu$b5roo%GnMZ";

// Domínios autorizados
const ALLOWED_ORIGINS = [
  "https://portaldopaciente.oculareoftalmo.med.br",
  "http://127.0.0.1",
  "http://localhost"
];

const getMedicalSchedules = async (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "";
  const isAuthorized = ALLOWED_ORIGINS.some((d) => origin?.startsWith?.(d));

  if (!isAuthorized) {
    return res.status(403).json({ message: "Acesso não autorizado" });
  }

  logging_1.default.info(NAMESPACE, "Result Medical schedules:");

  try {
    const db = await Connect();

    let dt = datetime.create();
    let DataFormatted = dt.format("Y-m-d");

    let TimeNow = Date();
    let DateNow = new Date(TimeNow);
    let NextYear = DateNow.getFullYear() + 1 + "-02-01";

    let params_id_doctor = req.params.doctor_id;

    // Consulta SQL original (mantida)
    let query = `
      SELECT 
        aa.chave, 
        tel.des_local, 
        aa.id_medico, 
        am.nom_medico, 
        aa.dat_agenda, 
        aa.des_hora 
      FROM arq_agendal aa
      INNER JOIN arq_medico am ON am.id_medico = aa.id_medico
      LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local
      WHERE dat_agenda >= '${DataFormatted}' 
        AND dat_agenda <= '${NextYear}'
        AND (aa.id_medico = '${params_id_doctor}')
        AND (aa.cod_paciente IS NULL AND COALESCE(aa.ind_status, ' ') <> 'B')
      ORDER BY aa.dat_agenda ASC, aa.des_hora ASC
    `;

    const result = await db.query(query);

    logging_1.default.info(NAMESPACE, "Result Medical schedules: ", result);

    if (!result.length) {
      return res.status(404).json({ Error: "Nenhum horário encontrado" });
    }

    // Cria token invisível de 10 minutos
    const token = jwt.sign(
      { tipo: "consulta_agenda", medico: params_id_doctor, total: result.length },
      SECRET_KEY,
      { expiresIn: "20m" }
    );

    // Impede cache (Cloudflare, navegador e proxy)
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "Surrogate-Control": "no-store"
    });

    // Mantém formato compatível com o front
    return res.status(200).json({ token, results: result });
  } catch (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message ? error.message : "Erro ao buscar horários médicos"
    });
  }
};

exports.getMedicalSchedules = getMedicalSchedules;