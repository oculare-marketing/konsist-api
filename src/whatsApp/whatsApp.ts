import { create, Whatsapp } from 'venom-bot';
import { Response, Request } from 'express';

interface PacientProps {
    name: string;
    doctorName: string;
    schedule: string;
    number: string;
    dateSchedule: string;
}

export  const  whatsApp = (req: Request, res: Response) =>{
    const pacient = req.body as PacientProps;
    console.log(pacient)
    global.client.sendText(pacient.number, 
        `*${pacient.name}*, Bom dia!
Seja muito bem vindo(a) a OCULARE OFTALMOLOGIA.
Conforme combinado sua consulta está agendada para o dia ${pacient.dateSchedule} às ${pacient.schedule} com ${pacient.doctorName}.

Por favor Digite *SIM* para confirmação.
Atenciosamente, Maria Eduarda.

*Endereço: Quadra SGAS 607, Centro Clínico Metrópolis, Sala 1 (área externa, lateral direita), Asa Sul, L2 sul, Brasília-DF*`
    )
    .then((result) => {
        res.status(200).json(result); //return object success
    })
    .catch((erro) => {
        res.status(200).json(erro); //return object error
    })
}