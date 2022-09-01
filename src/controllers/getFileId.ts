import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect } from '../config/postgres';
import { Base64 } from 'js-base64';
import fs from 'fs';
const pgp = require('pg-promise')({
    capSQL: true
});

const NAMESPACE = 'API';

interface EmailFileProps{
  file_id: number;
}

export const getFilesId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Result of Patient Files:');  

  
  Connect()
  .then( async data =>{
    const file_id = req.params.file_id;
    let query = `SELECT A.dat_arquivo, A.nom_arquivo, A.des_arquivo, A.dat_atendimento, D.nom_medico, B.imagem, B.des_extensao_imagem FROM arq_arquivos_paciente A LEFT JOIN arq_imagens B ON   A.id_imagem = B.id_imagem LEFT JOIN arq_medico D ON A.id_medico = D.id_medico WHERE A.id_arquivo_paciente = ${file_id} AND A.ind_excluido = FALSE ORDER BY A.dat_atendimento DESC`;
      
    
    
    const result = await data.query(query);
    const files = result[0];
    console.log(files.des_arquivo);
    let string = files.imagem.toString('base64');


    // var bin = Base64.atob(string);
    // Your code to handle binary data
    // fs.writeFile(`src/assets/${files.des_arquivo}.pdf`, bin, 'binary', error => {
    //     if (error) {
    //         throw error;
    //     } else {
    //       const data = fs.readFileSync(`src/assets/${files.des_arquivo}.pdf`);
    //       res.contentType("application/pdf");
    //       res.send(data);
    //       fs.unlink(`src/assets/${files.des_arquivo}.pdf`, err => {
    //         if(err) {
    //           throw error;
    //         }
    //       })
    //     }
    // });
    res.send(string)


      
  }).catch(error => {
      logging.error(NAMESPACE, error.message, error);
      console.log(error, req.params)
      return res.status(500).json({message: error.message ? error.message : 'Something went Wrong'});
  })
};