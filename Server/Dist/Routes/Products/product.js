"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = require("../../Controllers/Product/Product");
const Nightmare = require('nightmare');
const productRoutes = (0, express_1.default)();
productRoutes.get("/", async (req, res) => {
    const { keyword, category, page } = req.query;
    // Assigned Scraper into a scraper object
    const nightMare = Nightmare();
    const scraperObject = category?.includes("Tech")
        ? { scraper1: Product_1.scrapeAmazon, scraper2: Product_1.scrapeFlipkart }
        : category?.includes("Fashion") ?
            { scraper1: Product_1.scrapeMyntra, scraper2: Product_1.scrapeTataCliq } :
            { scraper1: Product_1.scrapeNetMeds, scraper2: Product_1.scrapeMg };
    // ALL API Urls 
    const amazon_url = `https://www.amazon.in/s?k=${keyword}&page=${page}`;
    const flipkart_url = `https://www.flipkart.com/search?q=$${keyword}&page=${page}`;
    const ajio_url = `https://www.ajio.com/search/?text=${keyword}`;
    const tata_cliq_url = `https://www.tatacliq.com/search/?searchCategory=all&text=${keyword}`;
    const netmeds_url = `https://www.netmeds.com/catalogsearch/result/${keyword}/all?prod_meds[page]=${page}`;
    const mg_1_url = `https://www.1mg.com/search/all?name=${keyword}`;
    // Data Flow
    const platform_url_1 = category?.includes("Tech")
        ? amazon_url
        : category?.includes("Fashion")
            ? ajio_url
            : netmeds_url;
    const platform_url_2 = category?.includes("Tech")
        ? flipkart_url
        : category?.includes("Fashion")
            ? tata_cliq_url
            : mg_1_url;
    try {
        // const platformResponse1 = await request.get(platform_url_1);
        // const platformResponse2 = await request.get(platform_url_2);
        // const dataFlip: Array<responseObjectProduct> =
        //   scraperObject.scraper1(platformResponse1);
        // const dataAmz: Array<responseObjectProduct> = 
        //   scraperObject.scraper2(platformResponse2);
        // const dataAfterComparison = consolidatedData(dataAmz, dataFlip);
        // const masterData = {
        //   dataForDownload: {
        //     amz_data: dataAmz,
        //     flip_data: dataFlip,
        //   },
        //   dataAfterComparison,
        // };
        // res.json(masterData);
        nightMare?.goto(platform_url_1).evaluate(() => );
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = productRoutes;
