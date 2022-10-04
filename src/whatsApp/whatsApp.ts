import { create, Whatsapp } from 'venom-bot';
import * as cron from 'node-cron'
import { google } from 'googleapis';

interface SheetProps {
    name: string;
    doctorName: string;
    schedule: string;
    number: string;
    dateSchedule: string;
}

export  const  whatsApp = () =>{
    const pacients: SheetProps[] = [];
    function FormatStringData(date: string) {
        var dia  = date.split("/")[0];
        var mes  = date.split("/")[1];
        var ano  = date.split("/")[2];
      
        return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
        // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
      }

    const callSheet = async () =>{
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets"
          });
        
        
          const client = await auth.getClient();
          const spreadsheetId = "1sqrEv91pBKXJBPzmI1gE7A0iumSZJk7rpAfP1F6nRl0"
          const googleSheets = google.sheets({version: "v4", auth: client});
        
          const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Página1"
          })
          const today = new Date();
          const sheets = getRows.data.values;  
          sheets.map((sheet) => {
              const date = new Date(FormatStringData(sheet[3]));
              if(date.toLocaleDateString() === today.toLocaleDateString()){ //  quando é passado para o dia local a data vai para o dia anterior
                let number: string = sheet[6];
                const name: string = sheet[0];
                const doctorName: string = sheet[2];
                const dateSchedule: string = sheet[3];
                const schedule: string = sheet[4];
                if(number.length < 10){
                    number = '9' + number;
                }
                number = '5561' + number.split('-')[0] + number.split('-')[1] + '@c.us';
                const specific: SheetProps = {
                    name,
                    doctorName,
                    schedule,
                    number,
                    dateSchedule
                }
                pacients.push(specific)
            }     
        })
    }

    create({
        session: 'atendimento-oculare', //name of session
        multidevice: true // for version not multidevice use false.(default: true)
    })
    .then(async (client: Whatsapp) => {
        await callSheet();
        cron.schedule('0 8 * * *', () => {
            
            pacients.map((pacient, index) =>{
                console.log(pacient.number, pacient.name, pacient.dateSchedule, pacient.schedule, pacient.doctorName)
                setTimeout(() => {
                    client.sendText(pacient.number, 
                        `*${pacient.name}*, Bom dia!\nSeja muito bem vindo(a) a OCULARE OFTALMOLOGIA.\nConforme combinado sua consulta está agendada para o dia ${pacient.dateSchedule} às ${pacient.schedule} com ${pacient.doctorName}.\n\nPor favor Digite *SIM* para confirmação.\nAtenciosamente, Maria Eduarda.\n\n\n\n*Endereço: Quadra SGAS 607, Centro Clínico Metrópolis, Sala 1 (área externa, lateral direita), Asa Sul, L2 sul, Brasília-DF*`
                    )
                        .then((result) => {
                            console.log("Result",result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        })
                    }, 10000*index);
            })
        },{
            scheduled: true,
            timezone: "America/Sao_Paulo"
        }
        );
    })
    .catch((erro: any) => {
        console.log(erro);
    });
}