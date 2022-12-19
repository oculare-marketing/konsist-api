"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsApp = void 0;
const whatsApp = (req, res) => {
    const patient = req.body;
    console.log(patient);
    global.client.sendText(patient.number, `${patient.message}`)
        .then((result) => {
        res.status(200).json(result); //return object success
    })
        .catch((erro) => {
        res.status(200).json(erro); //return object error
    });
};
exports.whatsApp = whatsApp;
//# sourceMappingURL=whatsApp.js.map