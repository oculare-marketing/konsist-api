import { Request, Response } from 'express';
import logging from '../config/logging';
import { Connect} from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';

async function putLGPD (req: Request, res: Response) {
  logging.info(NAMESPACE, 'Update schedule result:');    
  
 Connect()
.then( async data => {
      let params_patient_code = req.params.patient_code;

      let query = `INSERT INTO arq_paciente_autorizacao_dados (cod_paciente, int_origem_aceite, des_acao) VALUES (${params_patient_code}, 1, Teste);`;

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


export {putLGPD}

