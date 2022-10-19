import { Response, Request } from 'express';
import { google } from 'googleapis';
import { Connect } from '../config/postgres';
import logging from '../config/logging';
import bcrypt from "bcrypt";
import { config } from "dotenv"

interface PacientProps {
    nom_paciente_completo: string;
    nom_medico: string;
    des_hora: string;
    telefones_paciente: string;
    dat_agenda: Date;

}

const NAMESPACE = 'API';

export const getWhatsAppPacients = async (req: Request, res: Response) =>{
    const days = (parseInt(req.params.days) + 1).toString();
    const token = req.body.token;
    config()
    bcrypt.compare(process.env.PASSWORD, token, function(err, salt) {
        if(err){
            throw err;
        }else if(salt){
            Connect()
            .then( async data =>{                   
                let query = `SELECT * FROM vw_informacoes_agenda WHERE dat_agenda = CURRENT_DATE + ${days};`;            
                const result: PacientProps = await data.query(query)
                logging.info(NAMESPACE, 'Getting all agrements: ', result);
                
                return res.status(200).json({
                    result
                });
            
            }).catch(error => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
            }).finally();
        }else{
            return res.status(400).json('Invalid token');
        }
    })

}