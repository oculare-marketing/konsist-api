import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all users');

  Connect()
      .then( async data =>{                   
          let query = 'SELECT * FROM arq_paciente';            
          const result = await data.query(query)
          logging.info(NAMESPACE, 'Getting all users: ', result);
          
          return res.status(200).json({
              result
          });
      
      }).catch(error => {
          logging.error(NAMESPACE, error.message, error);
          return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
      }).finally();

};