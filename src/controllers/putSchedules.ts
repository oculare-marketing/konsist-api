import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, connection } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';
export const putSchedules = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Result schedules:');
  
  
  Connect()
.then( async data =>{
  
      let paramskey = req.params.key;
      console.log(paramskey)
      let query = `UPDATE arq_agendal SET ind_uso = TRUE WHERE chave = ${paramskey}`;
              
      const result = await data.query(query);
      logging.info(NAMESPACE, 'Result schedules: ', result);

      const results = result[0]
      
      return res.status(200).json({
             results         
      });
     
  }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })    
};