import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, connection } from '../config/postgres';
import { filteredAgreements } from '../data/filteredAgreements';
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
      let restrictedAgreements: string[];
      filteredAgreements.filter(val => {
        if(val.id === parseInt(doctorId)){
            restrictedAgreements = val.agreements
        }
      })
      let query = `SELECT tc.nom_convenio, tc.id_convenio FROM tab_convenio tc WHERE tc.ind_status = 'Ativo' AND COALESCE(tc.ind_oculto_atendimento, 'N') <> 'S'`;
      const result = await data.query(query);
      const resultAgreements: AgreementsProps[] = []
      result.filter((val: AgreementsProps) =>{
        if(!restrictedAgreements.includes(val.nom_convenio)){
            resultAgreements.push(val);
        }
      })
      return res.status(200).json({
        resultAgreements            
      });       
  }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })
};

