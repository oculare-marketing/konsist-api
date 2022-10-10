import { Response, Request } from 'express';
import { google } from 'googleapis';
import { Connect } from '../config/postgres';
import logging from '../config/logging';

interface SheetProps {
    nom_paciente_completo: string;
    nom_medico: string;
    des_hora: string;
    telefones_paciente: string;
    dat_agenda: Date;

}

const NAMESPACE = 'API';

export const getWhatsAppPacients = async (req: Request, res: Response) =>{
    
    Connect()
      .then( async data =>{                   
        let query = 'SELECT * FROM vw_informacoes_agenda WHERE dat_agenda = CURRENT_DATE + 1;';            
        const result: SheetProps = await data.query(query)
        logging.info(NAMESPACE, 'Getting all agrements: ', result);
        
        return res.status(200).json({
            result
        });
      
      }).catch(error => {
          logging.error(NAMESPACE, error.message, error);
          return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
      }).finally();

}