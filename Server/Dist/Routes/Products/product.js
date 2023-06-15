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
const string_similarity_js_1 = __importDefault(require("string-similarity-js"));
const Product_1 = require("../../Controllers/Product/Product");
const productRoutes = (0, express_1.default)();
productRoutes.get("/", async (req, res) => {
    const { keyword, sources } = req.query;
    const amazon_url = `https://www.amazon.in/s?k=${keyword}`;
    const flipkart = `https://www.flipkart.com/search?q=$${keyword}`;
    try {
        const promises = [];
        const platforms = sources;
        const flipKartRes = await request_promise_1.default.get(flipkart);
        const amazonAmz = await request_promise_1.default.get(amazon_url);
        const $ = cheerio.load(flipKartRes);
        const dataFlip = (0, Product_1.scrapeFlipkart)(flipKartRes);
        const dataAmz = (0, Product_1.scrapeAmazon)(amazonAmz);
        const dataAfterComparison = consolidatedData(dataAmz, dataFlip);
        const masterData = {
            dataForDownload: {
                amz_data: dataAmz,
                flip_data: dataFlip
            },
            dataAfterComparison
        };
        res.json(masterData);
    }
    catch (error) {
        res.json(error);
    }
});
function compareProductNames(amazonName, flipkartName) {
    const similarityScore = (0, string_similarity_js_1.default)(amazonName, flipkartName);
    // Adjust the similarity threshold as per your needs
    return similarityScore >= 0.5; // Consider a match if similarity is 40% or higher
}
const consolidatedData = (amazonData, flipKartData) => {
    const comparisonData = [];
    amazonData.forEach((amazonItem) => {
        const comparisonItem = {
            name: amazonItem.name,
            amz_price: amazonItem.price,
            flip_price: "",
            amz_rating: amazonItem.rating,
            flip_rating: "",
            amz_link: amazonItem.link,
            flip_link: "",
            flip_image: "",
            amz_image: amazonItem.image,
        };
        const matchingItems = flipKartData.filter((flipItem) => compareProductNames(amazonItem.name, flipItem.name));
        if (matchingItems.length > 0) {
            // Find the best matching item based on similarity score
            const bestMatch = matchingItems.reduce((best, current) => {
                const currentScore = (0, string_similarity_js_1.default)(amazonItem.name, current.name);
                return currentScore > best.score
                    ? { item: current, score: currentScore }
                    : best;
            }, { item: null, score: 0 });
            const matchedItem = bestMatch.item;
            comparisonItem.flip_price = matchedItem.price;
            comparisonItem.flip_rating = matchedItem.rating;
            comparisonItem.flip_link = matchedItem.link;
            comparisonItem.flip_image = matchedItem.image;
        }
        comparisonData.push(comparisonItem);
    });
    return comparisonData;
};
exports.default = productRoutes;
