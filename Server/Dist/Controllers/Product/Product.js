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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeNetMeds = exports.scrapeMg = exports.scrapeMyntra = exports.scrapeTataCliq = exports.scrapeFlipkart = exports.scrapeAmazon = void 0;
const cheerio = __importStar(require("cheerio"));
const scrapeAmazon = (data) => {
    const $ = cheerio.load(data);
    const products = [];
    $(".s-asin").each((i, el) => {
        const id = $(el).attr("data-asin");
        const name = $(el).find("h2 span").text();
        const price = $(el).find(".a-price-whole").text();
        const rating = $(el).find(".a-spacing-top-micro span").attr("aria-label");
        const image = $(el).find(".s-image").attr("src");
        const link = "https://www.amazon.in" + $(el).find(".a-link-normal").attr("href");
        const datas = { id, name, price, rating, image, link };
        products.push(datas);
    });
    return products;
};
exports.scrapeAmazon = scrapeAmazon;
const scrapeFlipkart = (data) => {
    const $ = cheerio.load(data);
    const products = [];
    $("._13oc-S").each((i, el) => {
        const id = $(el).children().first().attr('data-id');
        const name = $(el).find('._4rR01T').text();
        const price = $(el).find(`._30jeq3`).text();
        const rating = $(el).find(`._3LWZlK`).text();
        const image = $(el).find('._396cs4').attr('src');
        const link = "https://flipkart.com" + $(el).find('._1fQZEK').attr('href');
        const product = { id, name, price, rating, image, link };
        products.push(product);
    });
    return products;
};
exports.scrapeFlipkart = scrapeFlipkart;
const scrapeTataCliq = (data) => {
};
exports.scrapeTataCliq = scrapeTataCliq;
const scrapeMyntra = (data) => {
    const $ = cheerio.load(data);
    const products = [];
    $(".nameCls").each((i, el) => {
        console.log(el);
        const id = Math.random() * 212;
        const name = $(el).find('.nameCls').text();
        const price = $(el).find('.price').text();
        const rating = "-";
        const image = $(el).find('.rilrtl-lazy-img').attr('src');
        const link = "https://www.ajio.com" + $(el).find('.rilrtl-products-list__link').attr('href');
        const product = { id, name, price, rating, image, link };
        products.push(product);
    });
    return products;
};
exports.scrapeMyntra = scrapeMyntra;
const scrapeMg = (data) => {
};
exports.scrapeMg = scrapeMg;
const scrapeNetMeds = (data) => {
};
exports.scrapeNetMeds = scrapeNetMeds;
