
import express from 'express';
import * as execmail  from '../mail';
import * as controllers from '../controllers';
import * as postRecaptcha from '../recaptcha';
import * as postTwilioVerify from '../twilioVerify';
import * as postTwilioConfirmation from '../twilioConfirmation';
import * as postGoogleCalendar from '../googleCalendar';
import * as postGoogleSheets from '../googleSheets';
import * as getLGPDText from "../LGPDText"
import * as whatsApp from "../whatsApp"

const router = express.Router();

router.post('/create/user', controllers.createUsers);
router.get('/get/users', controllers.getUsers);
router.get('/get/user/:cpf', controllers.getUsersCPF);
router.put('/put/user', controllers.putUser);

router.get('/get/file/:file_id', controllers.getFilesId)
router.get('/get/files/:patient_code', controllers.getFiles)

router.post('/post/LGPD/:patient_code', controllers.postLGPD)
router.get('/get/LGPD/:patient_code', controllers.getLGPD)

router.get('/get/agreements', controllers.getAgreements);

router.get('/get/schedules', controllers.getSchedules);
router.put('/put/schedules/:key', controllers.putSchedules);

router.get('/get/doctors', controllers.getMedical);
router.get('/get/schedules/:doctor_id', controllers.getMedicalSchedules);

router.get('/get/marking/:patient_code', controllers.getMarked);
router.put('/put/marking/:key/:patient_code/:agreement_id', controllers.putMarked);

router.get('/get/procedures', controllers.getProcedures);

router.post('/post/mail', execmail.execmail);

router.post('/post/recaptcha', postRecaptcha.postRecaptcha);

router.post('/post/verify', postTwilioVerify.postTwilioVerify);

router.post('/post/confirmation', postTwilioConfirmation.postTwilioConfirmation);

router.post('/post/calendar', postGoogleCalendar.postGoogleCalendar);
router.post('/post/sheet', postGoogleSheets.postGoogleSheet);

router.get('/get/LGPDText', getLGPDText.getLGPDText);

router.get('/get/whatsAppPacients', whatsApp.getWhatsAppPacients)
router.post('/post/send-message', whatsApp.whatsApp)


export default router;