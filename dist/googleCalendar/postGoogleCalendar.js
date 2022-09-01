"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGoogleCalendar = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'API';
const postGoogleCalendar = async (req, res) => {
    logging_1.default.info(NAMESPACE, 'GoogleCalendar');
    const body = req.body;
    const { To } = body;
    const { google } = require('googleapis');
    const { OAuth2 } = google.auth;
    const OAuth2Client = new OAuth2('1060200137226-7v755p7auh4dedjkoti703u1bu5e8obn.apps.googleusercontent.com', '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');
    OAuth2Client.setCredentials({ refresh_token: '1//04U2BJ24bSzVsCgYIARAAGAQSNwF-L9Ir0a0Cb4WoP53RZ6lIrYD-zogL8q66Jb5i12iCfrl02yFvXxZANRyU9BTQKcRNB_pO_5Y' });
    const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });
    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDay() + 2);
    const eventEndTime = new Date();
    eventEndTime.setDate(eventEndTime.getDay() + 2);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
    const event = {
        summary: 'Encontro com o Daniel',
        location: 'Liberty Mall - SCN, quadra 2, bloco D, entrada A, Salas 316/317 - Asa Norte, Brasília - DF, 70712-903',
        description: 'Reunião para briga com o Daniel',
        start: {
            dateTime: eventStartTime,
            timeZone: 'America/Sao_Paulo'
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'America/Sao_Paulo'
        },
        colorId: 1
    };
    calendar.events.insert({ calendarId: 'primary', resource: event }, (err) => {
        if (err) {
            console.log(err);
            return console.error('Calender Event Creation Error');
        }
        return console.log('Calendar Event Created');
    });
};
exports.postGoogleCalendar = postGoogleCalendar;
//# sourceMappingURL=postGoogleCalendar.js.map