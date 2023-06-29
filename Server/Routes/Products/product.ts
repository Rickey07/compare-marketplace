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
  const scraperObject = category?.includes("Tech")
    ? { scraper1: scrapeAmazon, scraper2: scrapeFlipkart }
    : category?.includes("Fashion") ? 
    {scraper1:scrapeMyntra,scraper2:scrapeTataCliq} : 
    {scraper1:scrapeNetMeds,scraper2:scrapeMg}
    
  // ALL API Urls 
  const amazon_url = `https://www.amazon.in/s?k=${keyword}&page=${page}`;
  const flipkart_url = `https://www.flipkart.com/search?q=$${keyword}&page=${page}`;
  const myntra_url = `https://www.myntra.com/${keyword}?rawQuery=${keyword}`;
  const tata_cliq_url = `https://www.tatacliq.com/search/?searchCategory=all&text=${keyword}`;
  const netmeds_url = `https://www.netmeds.com/catalogsearch/result/${keyword}/all?prod_meds[page]=${page}`;
  const mg_1_url = `https://www.1mg.com/search/all?name=${keyword}`;

  const platform_url_1 = category?.includes("Tech")
    ? amazon_url
    : category?.includes("Fashion")
    ? myntra_url
    : netmeds_url;
  const platform_url_2 = category?.includes("Tech")
    ? flipkart_url
    : category?.includes("Fashion")
    ? tata_cliq_url
    : mg_1_url;
  try {
    console.log(platform_url_1,platform_url_2)
    const platformResponse1 = await request.get(platform_url_1);
    const platformResponse2 = await request.get(platform_url_2);
    const dataFlip: Array<responseObjectProduct> =
      scraperObject.scraper1(platformResponse1);
    const dataAmz: Array<responseObjectProduct> = 
      scraperObject.scraper2(platformResponse2);
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
