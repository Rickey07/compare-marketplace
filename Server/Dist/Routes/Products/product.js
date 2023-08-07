"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_promise_1 = __importDefault(require("request-promise"));
const Product_1 = require("../../Controllers/Product/Product");
const consolidateData_1 = require("../../Utils/consolidateData");
const productRoutes = (0, express_1.default)();
productRoutes.get("/", async (req, res) => {
    const { keyword, category, page } = req.query;
    // Assigned Scraper into a scraper object
    const scraperObject = category?.includes("Tech")
        ? { scraper1: Product_1.scrapeAmazon, scraper2: Product_1.scrapeFlipkart }
        : category?.includes("Fashion") ?
            { scraper1: Product_1.scrapeMyntra, scraper2: Product_1.scrapeTataCliq } :
            { scraper1: Product_1.scrapeMg, scraper2: Product_1.scrapeNetMeds };
    // ALL API Urls 
    const amazon_url = `https://www.amazon.in/s?k=${keyword}&page=${page}`;
    const flipkart_url = `https://www.flipkart.com/search?q=$${keyword}&page=${page}`;
    const ajio_url = `https://www.ajio.com/search/?text=${keyword}`;
    const tata_cliq_url = `https://www.myntra.com/${keyword}?rawQuery=${keyword}`;
    const netmeds_url = `https://www.netmeds.com/catalogsearch/result/${keyword}/all?prod_meds[page]=${page}`;
    const mg_1_url = `https://www.1mg.com/search/all?name=${keyword}`;
    // Data Flow
    const platform_url_1 = category?.includes("Tech")
        ? amazon_url
        : category?.includes("Fashion")
            ? ajio_url
            : mg_1_url;
    const platform_url_2 = category?.includes("Tech")
        ? flipkart_url
        : category?.includes("Fashion")
            ? tata_cliq_url
            : netmeds_url;
    try {
        let platformResponse1;
        let platformResponse2;
        let dataFlip;
        let dataAmz;
        if (category?.includes("Tech")) {
            platformResponse1 = await request_promise_1.default.get(platform_url_1);
            platformResponse2 = await request_promise_1.default.get(platform_url_2);
            dataFlip = scraperObject.scraper1(platformResponse1);
            dataAmz = scraperObject.scraper2(platformResponse2);
        }
        else {
            // Using Puppeteer For Scrapers
            dataFlip = await scraperObject.scraper1(platform_url_1);
            dataAmz = await scraperObject.scraper2(platform_url_2);
        }
        // Consolidate Data For Comparison
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
