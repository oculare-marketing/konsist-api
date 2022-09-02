import { Request, Response } from 'express';
import logging from '../config/logging';
import { Connect} from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';

async function postLGPD (req: Request, res: Response) {
  logging.info(NAMESPACE, 'Update schedule result:');    
  
let params_patient_code = req.params.patient_code;
 Connect()
.then( async data => {

      let query = `INSERT INTO arq_paciente_autorizacao_dados (cod_paciente, int_origem_aceite, des_acao) VALUES (${params_patient_code}, 1, 'ACEITE');`;

      const result = await data.query(query); 
      return res.status(200).json({
        result
      })
  })
  
  .catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })
};


export {postLGPD}

