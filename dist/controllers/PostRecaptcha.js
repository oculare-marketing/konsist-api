"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRecaptcha = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const axios_1 = __importDefault(require("axios"));
const NAMESPACE = 'API';
const postRecaptcha = async (req, res) => {
    logging_1.default.info(NAMESPACE, 'Recaptcha');
    const body = req.body;
    const { secret, token } = body;
    var secretKeyRecaptcha = secret;
    var TokenRecaptcha = token;
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    axios_1.default.post(verificationUrl, {
        secret: secretKeyRecaptcha,
        response: TokenRecaptcha
    })
        .then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.postRecaptcha = postRecaptcha;
//# sourceMappingURL=PostRecaptcha.js.map