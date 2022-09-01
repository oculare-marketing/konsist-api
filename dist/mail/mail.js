"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execmail = void 0;
const ConfigMail_1 = __importDefault(require("../config/ConfigMail"));
const nodemailer_1 = require("nodemailer");
const execmail = async (req, res) => {
    const body = req.body;
    const { name, email, data, hora, medico } = body;
    console.log('Req.body: ', req.body, 'Body destructuring: ', 'Name: ', name, 'Email: ', email, 'Data: ', data, 'Hora: ', hora, 'Medico: ', medico);
    let transporter = (0, nodemailer_1.createTransport)(ConfigMail_1.default);
    const mail = await transporter.sendMail({
        from: "Oculare Oftalmologia <agendamento@oculareoftalmo.med.br>",
        to: `${email}, oculare.marketing@gmail.com, oculare.relacionamento@gmail.com`,
        subject: `Agendamento realizado com sucesso!`,
        text: `Agendamento realizado com sucesso!`,
        html: `<!DOCTYPE html>
      <html lang="pt-br" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css"/>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style>
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          @media (max-width:670px) {
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .column .border {
              display: none;
            }
      
            table {
              table-layout: fixed !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body style="background-color: #fbfbfb; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fbfbfb;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:20px;padding-left:10px;width:100%;padding-right:0px;">
      <div align="center"><img alt="Logo" src="https://oculareoftalmo.med.br/wp-content/uploads/2022/04/logooculare-2-1.png" style="display: block; padding:30px 0; height: auto; border: 0; width: 300px; max-width: 100%;" title="Logo" width="300"/></div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2D5E6D;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-left:10px;padding-right:10px;padding-top:25px;">
      <div style="font-family: sans-serif">
      <div class="txtTinyMce-wrapper" style="font-size: 14px; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 16.8px; color: #ffffff; line-height: 1.2;">
      <p style="margin: 0; font-size: 30px; text-align: center;"><strong><span style="font-size:38px;">Obrigado por marcar sua consulta conosco, ${name}</span></strong></p>
      </div>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-left:10px;padding-right:10px;padding-top:10px;">
      <div style="font-family: sans-serif">
      <div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 21px; color: #ffffff; line-height: 1.5; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
      <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 33px;"><span style="font-size:22px;color:#ffffff;">Agendamento com o(a) Dr(a) ${medico} para a data:</span></p>
      </div>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="addon_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="width:100%;padding-right:0px;padding-left:0px;">
      <div align="center" style="line-height:10px"><img alt="Calendar animation" src="https://media0.giphy.com/media/iWYbVCsOhyHLYX0NSx/giphy.gif?cid=20eb4e9dx91gx27zwu9p5sgn2cvzjop32aw16pu8azhcw4o4&rid=giphy.gif&ct=s" style="display: block; height: auto; width: 163px; max-width: 100%;" title="Calendar animation" width="163"/></div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2D5E6D;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
      <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="vertical-align: middle; color: #ffffff; font-family: inherit; font-size: 21px; text-align: center;">
      <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="vertical-align: middle; text-align: center;">
      <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
      <!--[if !vml]><!-->
      <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
      <!--<![endif]-->
      <tr>
      <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 15px;"><img align="center" alt="Calendar icon" class="icon" height="32" src="https://oculareoftalmo.med.br/wp-content/uploads/2022/04/calendar__1_.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="32"/></td>
      <td style="font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 21px; color: #ffffff; vertical-align: middle; text-align: center;">${data}</td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
      <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="vertical-align: middle; color: #ffffff; font-family: inherit; font-size: 20px; padding-bottom: 15px; text-align: center;">
      <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="vertical-align: middle; text-align: center;">
      <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
      <!--[if !vml]><!-->
      <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
      <!--<![endif]-->
      <tr>
      <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 10px;"><img align="center" alt="Watch icon" class="icon" height="32" src="https://oculareoftalmo.med.br/wp-content/uploads/2022/04/midnight.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="32"/></td>
      <td style="font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 20px; color: #ffffff; vertical-align: middle; letter-spacing: undefined; text-align: center;">${hora}</td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2D5E6D;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:40px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:center;">
      <div align="center"><a href="https://api.whatsapp.com/send?phone=556132424222" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#5CBA3C;border-radius:4px;width:auto;border-top:0px solid #5CBA3C;border-right:0px solid #5CBA3C;border-bottom:0px solid #5CBA3C;border-left:0px solid #5CBA3C;padding-top:5px;padding-bottom:5px;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:24px;display:inline-block;letter-spacing:normal;"><span style="font-size: 12px; line-height: 2; word-break: break-word; mso-line-height-alt: 24px;"><span data-mce-style="font-size: 24px; line-height: 48px;" style="font-size: 24px; line-height: 48px;"><strong><span data-mce-style="line-height: 32px;" style="line-height: 32px;">Fale conosco pelo WhatsApp</span></strong></span></span></span></a>
      </div>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2D5E6D;" width="100%">
      <tbody>
      <tr>
      <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
      <tbody>
      <tr>
      <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
      <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:10px;padding-left:10px;padding-right:10px;">
      <div align="center">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="15%">
      <tr>
      <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 6px solid #FFFFFF;"><span></span></td>
      </tr>
      </table>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
      <tr>
      <td style="padding-bottom:20px;padding-left:20px;padding-right:20px;">
      <div style="font-family: sans-serif">
      <div class="txtTinyMce-wrapper" style="font-size: 14px; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #ffffff; line-height: 1.5;">
      <p style="margin: 0; color: #ffffff; font-size: 14px; text-align: center;"><span style="background-color:transparent; color: #ffffff;"><span style="font-size:20px;">Desejamos uma excelente atendimento na Oculare Oftalmologia.</span><br/>Acesse nossas redes sociais e compartilhe sua experiência!</span></p>
      </div>
      </div>
      </td>
      </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" class="social_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
      <tr>
      <td style="padding-bottom:20px;padding-left:10px;padding-right:10px;text-align:center;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="184px">
      <tr>
      <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com/oculareoftalmologiabrasilia" target="_blank"><img alt="Facebook" height="32" src="https://oculareoftalmo.med.br/wp-content/uploads/2022/04/facebook2x.png" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
      <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com/oculareoftalmologiabrasilia/" target="_blank"><img alt="Instagram" height="32" src="https://oculareoftalmo.med.br/wp-content/uploads/2022/04/instagram2x.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
      </tr>
      </table>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table><!-- End -->
      </body>
      </html>`
    }).then(message => {
        console.log(message);
    }).catch(error => {
        console.log(error);
    });
    return res.status(200).json({ mail, body });
};
exports.execmail = execmail;
//# sourceMappingURL=mail.js.map