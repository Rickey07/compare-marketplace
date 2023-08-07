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
const crypto_1 = require("crypto");
const pupetter = require("puppeteer");
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
        const id = $(el).children().first().attr("data-id");
        const name = $(el).find("._4rR01T").text();
        const price = $(el).find(`._30jeq3`).text();
        const rating = $(el).find(`._3LWZlK`).text();
        const image = $(el).find("._396cs4").attr("src");
        const link = "https://flipkart.com" + $(el).find("._1fQZEK").attr("href");
        const product = { id, name, price, rating, image, link };
        products.push(product);
    });
    return products;
};
exports.scrapeFlipkart = scrapeFlipkart;
const scrapeTataCliq = async (url) => {
    const browser = await pupetter.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const productPrice = await page.waitForSelector("div");
    const allElements = await page.$("div");
};
exports.scrapeTataCliq = scrapeTataCliq;
const scrapeMyntra = async (url) => {
    const browser = await pupetter.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const productPrice = await page.waitForSelector(".rilrtl-products-list__item");
    const allElements = await page.$$(".rilrtl-products-list__item");
    const products = await Promise.all(allElements.map(async (el) => {
        const id = (0, crypto_1.randomUUID)();
        const name = await el.$eval(".nameCls", (e) => e.innerText);
        const price = await el.$eval(".price", (e) => e.innerText);
        // const rating = await el.$eval('.discount', (e:any) => e.innerText) ?? "-"
        const link = await el.$eval(".rilrtl-products-list__link", (e) => "https://ajio.com" + e.getAttribute("href"));
        let rating = "N/A";
        let image = null;
        try {
            rating = await el.$eval(".discount", (e) => e.innerText);
            image = await el.$eval("img", (e) => e.getAttribute("src"));
        }
        catch (error) {
            // Handle the case when the price element is not present
            rating = "N/A";
            image = null; // Set a default value or handle it as needed
        }
        return { name, price, rating, image, link };
    }));
    await browser.close();
    return products;
};
exports.scrapeMyntra = scrapeMyntra;
const scrapeMg = async (url) => {
    const browser = await pupetter.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const productPrice = await page.waitForSelector(".style__horizontal-card___1Zwmt");
    const allElements = await page.$$(".style__horizontal-card___1Zwmt");
    const products = await Promise.all(allElements.map(async (el) => {
        const id = (0, crypto_1.randomUUID)();
        const name = await el.$eval(".style__pro-title___3zxNC", (e) => e.innerText);
        const price = await el.$eval(".style__price-tag___B2csA", (e) => e.innerText);
        // const rating = await el.$eval('.discount', (e:any) => e.innerText) ?? "-"
        const link = await el.$eval("a", (e) => "https://www.1mg.com" + e.getAttribute("href"));
        let rating = "N/A";
        let image = null;
        try {
            rating = await el.$eval(".style__off-badge___21aDi", (e) => e.innerText);
            image = await el.$eval("img", (e) => e.getAttribute("src"));
        }
        catch (error) {
            // Handle the case when the price element is not present
            rating = "N/A";
            image = null; // Set a default value or handle it as needed
        }
        return { id, name, price, rating, image, link };
    }));
    await browser.close();
    return products;
};
exports.scrapeMg = scrapeMg;
const scrapeNetMeds = async (url) => {
    const browser = await pupetter.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const productPrice = await page.waitForSelector(".ais-InfiniteHits-item");
    const allElements = await page.$$(".ais-InfiniteHits-item");
    const products = await Promise.all(allElements.map(async (el) => {
        const id = (0, crypto_1.randomUUID)();
        const name = await el.$eval(".clsgetname", (e) => e.innerText);
        const price = await el.$eval("#final_price", (e) => e.innerText);
        // const rating = await el.$eval('.discount', (e:any) => e.innerText) ?? "-"
        const link = await el.$eval(".category_name", (e) => "https://netmeds.com" + e.getAttribute("href"));
        let rating = "N/A";
        let image = null;
        try {
            rating = await el.$eval(".style__off-badge___21aDi", (e) => e.innerText);
            image = await el.$eval("img", (e) => e.getAttribute("src"));
        }
        catch (error) {
            // Handle the case when the price element is not present
            rating = "N/A";
            image = null; // Set a default value or handle it as needed
        }
        return { id, name, price, rating, image, link };
    }));
    await browser.close();
    return products;
};
exports.scrapeNetMeds = scrapeNetMeds;
