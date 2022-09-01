"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTwilioConfirmation = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'API';
const postTwilioConfirmation = async (req, res) => {
    logging_1.default.info(NAMESPACE, 'Confirmation');
    const body = req.body;
    const { To, Code } = body;
    const accountSid = "AC25edda61a3959bdefd25648f107d8f50";
    const authToken = "98066e9ab073d6c4abaa4c13dfb8d60c";
    const client = require('twilio')(accountSid, authToken);
    client.verify.services('VA16b3a308136191c996df2328deee32a2')
        .verificationChecks
        .create({ to: To, code: Code })
        .then((verification_check) => {
        const data = verification_check.status;
        console.log(verification_check.status);
        res.status(200).json(data);
    })
        .catch((error) => {
        const status = error.status;
        const data = error;
        res.status(status).json(data);
    });
};
exports.postTwilioConfirmation = postTwilioConfirmation;
//# sourceMappingURL=postTwilioConfirmation.js.map