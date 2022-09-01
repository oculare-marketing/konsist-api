import { Response, Request } from 'express';
import { google } from 'googleapis';
import logging from '../config/logging';

const NAMESPACE = 'API';

export const postGoogleSheet = async (req: Request, res: Response) => {
    
  logging.info(NAMESPACE, 'GoogleSheet');
  type RequestBody = {
    name: string,
    birthDate: string,
    doctorName: string,
    date: string,
    schedule: string,
    email: string,
    phoneNum: string,
    newPacient: string,
    loginDate: string
  } 
  const body = req.body as RequestBody;
  const { name, birthDate, doctorName, date, schedule, email, phoneNum, newPacient, loginDate } = body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });


  const client = await auth.getClient();
  const spreadsheetId = "1sqrEv91pBKXJBPzmI1gE7A0iumSZJk7rpAfP1F6nRl0"
  const googleSheets = google.sheets({version: "v4", auth: client});

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  })

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Página1"
  })

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Página1",
    valueInputOption: "USER_ENTERED",
    requestBody:{
        values: [
            [name, birthDate, doctorName, date, schedule, email, phoneNum, newPacient, loginDate]
        ]
    },
  })

  res.send(getRows.data)

}