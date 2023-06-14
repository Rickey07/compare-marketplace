"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./Utils/dbConnect"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./Routes/Auth/auth"));
const product_1 = __importDefault(require("./Routes/Products/product"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// App Common Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
// App Routes
app.use('/api', auth_1.default);
app.use('/api/products', product_1.default);
// Connect to database
(0, dbConnect_1.default)();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(port + "Process is running...");
});
