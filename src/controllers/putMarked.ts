import { NextFunction, Request, Response } from 'express';
import { execmail } from '../mail/mail';
import logging from '../config/logging';
import { Connect} from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';

async function putMarked (req: Request, res: Response, next: NextFunction) {
  logging.info(NAMESPACE, 'Update schedule result:');    
  
 Connect()
.then( async data => {
      let params_patient_code = req.params.patient_code;
      let params_key = req.params.key;
      let params_agreement_id = req.params.agreement_id;

      let query = `UPDATE arq_agendal SET cod_procedimento = '10101012', cod_paciente = ${params_patient_code}, id_convenio = ${params_agreement_id}, des_procedimento = 0, dat_marcacao = CURRENT_TIMESTAMP, id_agenda_origem = (SELECT id_agenda_origem FROM tab_agenda_origem WHERE des_agenda_origem = 'Site') WHERE chave = ${params_key}; INSERT INTO arq_agenda_procedimento (chave, cod_procedimento, des_procedimento, qtd_procedimento, ind_procedimento, ind_informado) VALUES (${params_key}, 10101012, 'CONSULTA - EM CONSULTORIO (NO HORARIO NORMAL OU PREESTABELECIDO)', 1, '0', FALSE);`;

      const result = await data.query(query);   
      logging.info(NAMESPACE, 'Update schedule result: ', result);  
  }).then(() =>{
    Connect().then( async data => {
      let params_patient_code = req.params.patient_code;

      let query = `SELECT aa.dat_agenda, aa.des_hora, am.nom_medico, tel.des_local, aa.cod_procedimento, aa.des_procedimento
      FROM arq_agendal aa INNER JOIN arq_medico am ON am.id_medico = aa.id_medico LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local WHERE aa.cod_paciente = ${params_patient_code} AND COALESCE(aa.ind_status, ' ') IN (' ', 'A', 'M', 'C', 'L')`;

      const result = await data.query(query);
      const lastresult = result[result.length - 1]
      logging.info(NAMESPACE, 'Update schedule result: ', result);
        return res.status(200).json({
          lastresult
        })
    })
    }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      console.log(error, req.params)
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })
};


export {putMarked}

