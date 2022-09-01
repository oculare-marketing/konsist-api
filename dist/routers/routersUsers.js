"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const execmail = __importStar(require("../mail"));
const controllers = __importStar(require("../controllers"));
const postRecaptcha = __importStar(require("../recaptcha"));
const postTwilioVerify = __importStar(require("../twilioVerify"));
const postTwilioConfirmation = __importStar(require("../twilioConfirmation"));
const postGoogleCalendar = __importStar(require("../googleCalendar"));
const postGoogleSheets = __importStar(require("../googleSheets"));
const router = express_1.default.Router();
router.post('/create/user', controllers.createUsers);
router.get('/get/users', controllers.getUsers);
router.get('/get/user/:cpf', controllers.getUsersCPF);
router.put('/put/user', controllers.putUser);
router.get('/get/file/:file_id', controllers.getFilesId);
router.get('/get/files/:patient_code', controllers.getFiles);
router.post('/post/LGPD/:patient_code', controllers.putLGPD);
router.get('/get/agreements/:doctor_id', controllers.getAgreements);
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
exports.default = router;
//# sourceMappingURL=routersUsers.js.map