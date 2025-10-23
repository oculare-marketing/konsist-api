"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLGPDText = void 0;
const fs_1 = __importDefault(require("fs"));
const NAMESPACE = 'API';
const getLGPDText = async (req, res) => {
    const data = fs_1.default.readFileSync("src/assets/LGPD.pdf");
    res.contentType("application/pdf");
    res.send(data);
};
exports.getLGPDText = getLGPDText;
//# sourceMappingURL=GetLGPDText.js.map