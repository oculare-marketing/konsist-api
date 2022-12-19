import { create, Whatsapp } from 'venom-bot';
import { Response, Request } from 'express';

interface PatientProps {
    number: string;
    message: string;
}

export  const  whatsApp = (req: Request, res: Response) =>{
    const patient = req.body as PatientProps;
    console.log(patient)
    global.client.sendText(patient.number, 
        `${patient.message}`
    )
    .then((result) => {
        res.status(200).json(result); //return object success
    })
    .catch((erro) => {
        res.status(200).json(erro); //return object error
    })
}