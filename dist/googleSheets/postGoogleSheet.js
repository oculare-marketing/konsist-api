"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGoogleSheet = void 0;
const googleapis_1 = require("googleapis");
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'API';
const postGoogleSheet = async (req, res) => {
    logging_1.default.info(NAMESPACE, 'GoogleSheet');
    const body = req.body;
    const { name, birthDate, doctorName, date, schedule, email, phoneNum, newPacient, loginDate } = body;
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();
    const spreadsheetId = "1sqrEv91pBKXJBPzmI1gE7A0iumSZJk7rpAfP1F6nRl0";
    const googleSheets = googleapis_1.google.sheets({ version: "v4", auth: client });
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Página1"
    });
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Página1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [name, birthDate, doctorName, date, schedule, email, phoneNum, newPacient, loginDate]
            ]
        },
    });
    res.send(getRows.data);
};
exports.postGoogleSheet = postGoogleSheet;
//# sourceMappingURL=postGoogleSheet.js.map