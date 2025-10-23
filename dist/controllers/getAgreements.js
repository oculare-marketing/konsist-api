"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgreements = void 0;

const logging_1 = __importDefault(require("../config/logging"));
const { Connect } = require("../config/postgres");
const jwt = require("jsonwebtoken");

const NAMESPACE = "API";
const SECRET_KEY = process.env.JWT_SECRET || "EX&,wKPRSthH9o.bj@m>f$lqh}E82^tH!P8s/nu$b5roo%GnMZ";

// Origens permitidas (somente o portal do paciente e localhost)
const ALLOWED_ORIGINS = [
  "https://portaldopaciente.oculareoftalmo.med.br",
  "http://127.0.0.1",
  "http://localhost"
];

const getAgreements = async (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "";
  const isAuthorized = ALLOWED_ORIGINS.some(d => origin?.startsWith?.(d));

  if (!isAuthorized) {
    return res.status(403).json({ message: "Acesso não autorizado" });
  }

  logging_1.default.info(NAMESPACE, "Buscando convênios ativos...");

  try {
    const db = await Connect();
    const query = `
      SELECT 
        tc.nom_convenio, 
        tc.id_convenio 
      FROM tab_convenio tc 
      WHERE tc.ind_status = 'Ativo' 
        AND COALESCE(tc.ind_oculto_atendimento, 'N') <> 'S'
      ORDER BY tc.nom_convenio ASC
    `;
    const result = await db.query(query);

    if (!result.length) {
      return res.status(404).json({ Error: "Nenhum convênio encontrado" });
    }

    // Cria um token JWT curto (10 minutos)
    const token = jwt.sign(
      { tipo: "consulta_convenios", total: result.length },
      SECRET_KEY,
      { expiresIn: "20m" }
    );

    // Impede cache no navegador e na Cloudflare
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "Surrogate-Control": "no-store"
    });

    // Retorna no formato esperado pelo front (mantendo compatibilidade)
    return res.status(200).json({ token, result });
  } catch (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message ? error.message : "Erro ao buscar convênios"
    });
  }
};

exports.getAgreements = getAgreements;
