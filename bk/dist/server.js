"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const routersUsers_1 = __importDefault(require("./routers/routersUsers"));
const cors_1 = __importDefault(require("cors"));
const NAMESPACE = 'Server';
const router = (0, express_1.default)();
/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use((req, res, next) => {
    router.use((0, cors_1.default)());
    const whitelist = ['https://portaldopaciente.oculareoftalmo.med.br', 'http://127.0.0.1'];
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
    // if (req.headers['origin'] === 'https://portaldopaciente.oculareoftalmo.med.br' || req.headers['origin'] === 'https://confirmacao-front.vercel.app') {
    //     if (req.method == 'OPTIONS') {
    //         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //         return res.status(200).json({});
    //     }
    //     next();
    // } else {
    //     return res.status(403).json(
    //         {
    //             'Error': 'Restricted request access'
    //         });     
    // } 
});
/** Routes go here */
router.use('/', routersUsers_1.default);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
    next();
});
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
//# sourceMappingURL=server.js.map