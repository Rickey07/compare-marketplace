"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const cheerio = __importStar(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
const Product_1 = require("../../Controllers/Product/Product");
const consolidateData_1 = require("../../Utils/consolidateData");
const productRoutes = (0, express_1.default)();
productRoutes.get("/", async (req, res) => {
    const { keyword, sources, page } = req.query;
    const amazon_url = `https://www.amazon.in/s?k=${keyword}&page=${page}`;
    const flipkart = `https://www.flipkart.com/search?q=$${keyword}&page=${page}`;
    try {
        const platforms = sources;
        const flipKartRes = await request_promise_1.default.get(flipkart);
        const amazonAmz = await request_promise_1.default.get(amazon_url);
        const $ = cheerio.load(flipKartRes);
        const dataFlip = (0, Product_1.scrapeFlipkart)(flipKartRes);
        const dataAmz = (0, Product_1.scrapeAmazon)(amazonAmz);
        const dataAfterComparison = (0, consolidateData_1.consolidatedData)(dataAmz, dataFlip);
        const masterData = {
            dataForDownload: {
                amz_data: dataAmz,
                flip_data: dataFlip,
            },
            dataAfterComparison,
        };
        res.json(masterData);
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = productRoutes;
