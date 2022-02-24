"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const nocache_1 = __importDefault(require("nocache"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, nocache_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.hidePoweredBy());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.post("/hook", (req, res) => {
    console.log({ bodyyyyyy: req.body });
    res.status(200).json({ msg: "success" });
});
app.get("/", (_req, res) => {
    res.end("Works!!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map