import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});
const datetime = require('node-datetime');
const NAMESPACE = 'API';

export const getSchedules = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Result schedules:');
  
  Connect()
.then( async data =>{
      let dt = datetime.create();
      let DataFormatted = dt.format('Y-m-d');
      let TimeNow = Date();
      let DateNow = new Date(TimeNow);
      let NextYear = DateNow.getFullYear() + 1 + '-02-01';
      var PartsDate = DataFormatted.split("-");
      let query = `SELECT aa.chave, tel.des_local, aa.id_medico, am.nom_medico, aa.dat_agenda, aa.des_hora FROM arq_agendal aa INNER JOIN arq_medico am ON am.id_medico = aa.id_medico LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local WHERE dat_agenda >= '${DataFormatted}' AND dat_agenda <= '${NextYear}' AND (aa.cod_paciente IS NULL AND COALESCE(aa.ind_status, ' ') <> 'B')`;
              
      const result = await data.query(query);
      logging.info(NAMESPACE, 'Result schedules: ', result);         
              
      return res.status(200).json({
          result
      });
     
  }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })    
};