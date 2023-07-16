import express, { Request, Response } from "express";
import * as cheerio from "cheerio";
import request from "request-promise";
import axios from "axios";
import similarity from "string-similarity-js";
import {
  scrapeAmazon,
  scrapeFlipkart,
  scrapeMg,
  scrapeMyntra,
  scrapeNetMeds,
  scrapeTataCliq,
} from "../../Controllers/Product/Product";
import { consolidatedData } from "../../Utils/consolidateData";
import { ParsedUrlQuery } from "querystring";
const productRoutes = express();

interface responseObjectProduct {
  id: string;
  name: string;
  price: string;
  rating: string;
  image: string;
  link: string;
}

interface queryRes {
  keyword: string;
  category: string;
  page: number;
}

productRoutes.get("/", async (req: Request, res: Response) => {
  const { keyword, category, page } = req.query as ParsedUrlQuery;
  // Assigned Scraper into a scraper object
  const scraperObject = category?.includes("Tech")
    ? { scraper1: scrapeAmazon, scraper2: scrapeFlipkart }
    : category?.includes("Fashion") ? 
    {scraper1:scrapeMyntra,scraper2:scrapeTataCliq} : 
    {scraper1:scrapeMg,scraper2:scrapeNetMeds}
    
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
    : mg_1_url;
  const platform_url_2 = category?.includes("Tech")
    ? flipkart_url
    : category?.includes("Fashion")
    ? tata_cliq_url
    : netmeds_url;
  try {
    let platformResponse1
    let platformResponse2
    let dataFlip
    let dataAmz
    if(category?.includes("Tech")) {
       platformResponse1 = await request.get(platform_url_1);
       platformResponse2 = await request.get(platform_url_2);
       dataFlip = scraperObject.scraper1(platformResponse1);
       dataAmz = scraperObject.scraper2(platformResponse2);
       console.log(dataFlip,dataAmz)
    } else {
      // Using Puppeteer For Scrapers
       dataFlip = await scraperObject.scraper1(platform_url_1);
       dataAmz = await scraperObject.scraper2(platform_url_2);
    }
    // Consolidate Data For Comparison
    const dataAfterComparison = consolidatedData(dataAmz, dataFlip);
    const masterData = {
      dataForDownload: {
        amz_data: dataAmz,
        flip_data: dataFlip,
      },
      dataAfterComparison,
    };
    res.json(masterData);
  } catch (error) {
    res.json(error);
  }
});

export default productRoutes;
