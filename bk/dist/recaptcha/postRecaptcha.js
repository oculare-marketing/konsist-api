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
    const { secret, response } = body;
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
    console.log('Secret: ', secret, 'response: ', response);
    axios_1.default.post(verificationUrl, null, { params: { secret, response }
    })
        .then(function (response) {
        console.log(response.data);
        const data = response.data;
        res.status(200).json(data);
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.postRecaptcha = postRecaptcha;
//# sourceMappingURL=postRecaptcha.js.map