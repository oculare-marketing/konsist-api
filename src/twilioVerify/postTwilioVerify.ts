import { Response, Request } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'API';

export const postTwilioVerify = async (req: Request, res: Response) => {
    
  logging.info(NAMESPACE, 'Verify');
  type RequestBody = {
    To: string, 
  } 
  const body = req.body;
  const { To } = body;

  const accountSid = "AC25edda61a3959bdefd25648f107d8f50";
  const authToken = "98066e9ab073d6c4abaa4c13dfb8d60c";

  const client = require('twilio')(accountSid, authToken);
  
  client.verify.services('VA16b3a308136191c996df2328deee32a2')
               .verifications
               .create({to: To, channel: 'sms'})
               .then((verification: any) => {
                const data = verification.status;
                res.status(200).json(data); 
              })
               .catch((error: any) => {
                const status = error.status;
                const data = error;
                res.status(status).json(data);
               })

}