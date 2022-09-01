import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, connection } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});
const datetime = require('node-datetime');

const NAMESPACE = 'API';


export const getUsersCPF = async (req: Request, res: Response, next: NextFunction) => {


    logging.info(NAMESPACE, 'Getting CPF');
    let paramsCPF = req.params.cpf;
    let query = `SELECT * FROM arq_paciente WHERE num_cpf LIKE '%${paramsCPF}%'::varchar` ;

    Connect()
    .then( async data =>{       
            
        const result = await data.query(query);
        logging.info(NAMESPACE, 'Get user CPF: ', result);
        if (result[0] !== undefined) {
            return res.status(200).json({
                result
            });
        } else {           
        return res.status(404).json({Error: 'CPF not found'});
        }
           
        }).catch(error => {
            logging.error(NAMESPACE, error.message, error);
        return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
        })
};