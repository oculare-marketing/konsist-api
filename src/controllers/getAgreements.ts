import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, connection } from '../config/postgres';
const pgp = require('pg-promise')({
    capSQL: true
});
const NAMESPACE = 'API';

interface AgreementsProps {
    nom_convenio: string,
    id: number
}


export const getAgreements = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all agreements.');
 
  Connect()
.then( async data =>{    
      let doctorId = req.params.doctor_id;
      let result: AgreementsProps[] = []
      let restrictedAgreements: string[];
      let query = `SELECT tc.nom_convenio, tc.id_convenio FROM tab_convenio tc WHERE tc.ind_status = 'Ativo' AND COALESCE(tc.ind_oculto_atendimento, 'N') <> 'S'`;
      result =  await data.query(query);
      
      return res.status(200).json({
        result            
      });       
  }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })
};

