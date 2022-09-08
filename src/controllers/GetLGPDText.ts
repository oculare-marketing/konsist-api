import { Response, Request } from 'express';
import logging from '../config/logging';
import fs from 'fs';

const NAMESPACE = 'API';

export const getLGPDText = async (req: Request, res: Response) => {
    const data = fs.readFileSync("src/assets/LGPD.pdf");
    res.contentType("application/pdf");
    res.send(data);
   

}