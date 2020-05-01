"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var route_1 = require("./route");
var app = express_1.default();
app.get('/', route_1.helloWorld);
app.listen(3333);
