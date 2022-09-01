import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, connection } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const datetime = require('node-datetime');
const NAMESPACE = 'API';

type RequestBody = {
    cod_paciente: number,
    mem_obs: string,
  }

export const putUser = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as RequestBody;
    const {cod_paciente, mem_obs} = body;
    
    let query = `UPDATE arq_paciente SET mem_obs = '${mem_obs}' WHERE cod_paciente = ${cod_paciente}`;
              
    Connect()
    .then(async (data) => {
        const result = await data.query(query);   
        logging.info(NAMESPACE, 'Update user result: ', result);   
        
        return res.status(200).json({
            result: 'user updated successfully',
        });
    }).catch((error) => {
    logging.error(NAMESPACE, error.message, error);
     return res.status(500).json({message: 'Failed to update new user', error});
    })
}