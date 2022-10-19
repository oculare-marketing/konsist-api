import { create, Whatsapp } from 'venom-bot';
import { Response, Request } from 'express';

interface PacientProps {
    number: string;
    message: string;
}

export  const  whatsApp = (req: Request, res: Response) =>{
    const pacient = req.body as PacientProps;
    console.log(pacient)
    global.client.sendText(pacient.number, 
        `${pacient.message}`
    )
    .then((result) => {
        res.status(200).json(result); //return object success
    })
    .catch((erro) => {
        res.status(200).json(erro); //return object error
    })
}