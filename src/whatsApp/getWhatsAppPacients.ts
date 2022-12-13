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

interface AppointmentProps {
    cod_procedimento: string
    dat_agenda: string
    des_hora: string
    des_procedimento: string
    nom_medico: string
  }

const NAMESPACE = 'API';

export const getWhatsAppPacients = async (req: Request, res: Response) =>{
    const days = (parseInt(req.params.days) + 1).toString();
    const token = req.body.token;
    const filtered = req.body.filtered;
    config()
    bcrypt.compare(process.env.PASSWORD, token, function(err, salt) {
        if(err){
            throw err;
        }else if(salt){
            Connect()
            .then( async data =>{                 
                const query = `SELECT * FROM vw_informacoes_agenda WHERE dat_agenda = CURRENT_DATE + ${days};`;            
                let result: PacientProps[] = await data.query(query)
                let finalResult: PacientProps[] = [];
                if(filtered){
                    result.map(async (pat, index, list) =>{
                        let last = 0;
                        let day: Date;
                        const queryName = `SELECT * FROM arq_paciente WHERE nom_paciente_completo LIKE '%${pat.nom_paciente_completo}%'::varchar`
                        const patComplete = await data.query(queryName);
                        const cod = patComplete[0].cod_paciente;
                        const queryCod = `SELECT aa.dat_agenda, aa.des_hora, am.nom_medico, tel.des_local, aa.cod_procedimento, aa.des_procedimento
                        FROM arq_agendal aa INNER JOIN arq_medico am ON am.id_medico = aa.id_medico LEFT JOIN tab_empresa_locais tel ON aa.id_local = tel.id_local WHERE aa.cod_paciente = ${cod} AND COALESCE(aa.ind_status, ' ') IN (' ', 'A', 'M', 'C', 'L')`
                        const appointments = await data.query(queryCod)
                        appointments.map((appointment: AppointmentProps) =>{
                        const aux = new Date(appointment.dat_agenda).getTime();
                        if(last < aux){ // olha a ultima consulta do paciente e o ultimo medico dele
                            last = aux; 
                            day = new Date(appointment.dat_agenda)
                        }
                        })
                        const today = new Date();
                        if(day !== undefined){ 
                            const DifferenceInTime = day.getTime() - today.getTime();
                            const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
                            if(DifferenceInDays <= -360){
                                finalResult.push(pat)
                            }
                        }
                        if(list.length === index + 1){
                            return res.status(200).json({
                                finalResult
                            });
                        }
                    })
                }else{
                    finalResult = result
                    return res.status(200).json({
                        finalResult
                    });
                }
                
            
            }).catch(error => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
            }).finally();
        }else{
            return res.status(400).json('Invalid token');
        }
    })

}