import { Response, Request } from 'express';
import logging from '../config/logging';
import axios from 'axios'

const NAMESPACE = 'API';

export const postRecaptcha = async (req: Request, res: Response) => {
    
  logging.info(NAMESPACE, 'Recaptcha');
    
    const body = req.body
    const {secret, token } = body
  
  var secretKeyRecaptcha = secret;
  var TokenRecaptcha = token;
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";

  axios.post(verificationUrl, {
    secret: secretKeyRecaptcha,
    response: TokenRecaptcha
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}