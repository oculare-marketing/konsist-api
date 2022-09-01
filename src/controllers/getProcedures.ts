import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';

export const getProcedures = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Procedures result:');
    
    
    Connect()
.then( async data =>{

        let query = `SELECT cod_procedimento, des_procedimento FROM tab_particular WHERE ind_ativo = TRUE`;

        const result = await data.query(query);
        logging.info(NAMESPACE, 'Procedures result: ', result);
        
        return res.status(200).json({
            result
        });       
    
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);
        console.log(error, req.params)
        return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
    })
};
