"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const humps = __importStar(require("humps"));
const express_mung_1 = __importDefault(require("express-mung"));
exports.requestModifier = (request, _response, next) => {
    request.params = humps.camelizeKeys(request.params);
    request.body = humps.camelizeKeys(request.body);
    next();
};
const responseModifierAction = (body, _request, _response) => {
    return humps.decamelizeKeys(body);
};
exports.responseModifier = express_mung_1.default.json(responseModifierAction);
//# sourceMappingURL=index.js.map