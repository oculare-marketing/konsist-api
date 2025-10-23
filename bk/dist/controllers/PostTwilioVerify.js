"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTwilioVerify = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'API';
const postTwilioVerify = async (req, res) => {
    logging_1.default.info(NAMESPACE, 'Verify');
    const body = req.body;
    const { To } = body;
    let verifyURL = "https://verify.twilio.com/v2/Services/VA16b3a308136191c996df2328deee32a2/Verifications";
    const accountSid = "AC25edda61a3959bdefd25648f107d8f50";
    const authToken = "98066e9ab073d6c4abaa4c13dfb8d60c";
    const client = require('twilio')(accountSid, authToken);
    console.log("Token", accountSid, "Sid", authToken);
    client.verify.services('VA16b3a308136191c996df2328deee32a2')
        .verifications
        .create({ to: To, channel: 'sms' })
        .then((verification) => {
        const data = verification.status;
        res.status(200).json(data);
    })
        .catch((error) => {
        const status = error.status;
        const data = error;
        res.status(status).json(data);
    });
};
exports.postTwilioVerify = postTwilioVerify;
//# sourceMappingURL=PostTwilioVerify.js.map