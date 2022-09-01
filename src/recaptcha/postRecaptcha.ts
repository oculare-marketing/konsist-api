import { Response, Request } from 'express';
import logging from '../config/logging';
import axios from 'axios'

const NAMESPACE = 'API';

export const postRecaptcha = async (req: Request, res: Response) => {
    
  logging.info(NAMESPACE, 'Recaptcha');
  type RequestBody = {
    secret: string, 
    response: string
  } 
    const body = req.body
    const { secret, response } = body  

    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";

  console.log('Secret: ', secret, 'response: ', response)

  axios.post(verificationUrl, null, 
    { params: 
      { secret, response }
    })

  .then(function (response) {
    console.log(response.data);
    const data = response.data;
    
    res.status(200).json(data);
  })
  .catch(function (error) {
    console.log(error);
  });

}