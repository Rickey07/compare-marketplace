import express, { Request, Response } from "express";
import * as cheerio from "cheerio";
import request from "request-promise";
import axios from "axios";
import similarity from "string-similarity-js";
import {
  scrapeAmazon,
  scrapeFlipkart,
} from "../../Controllers/Product/Product";
import { consolidatedData } from "../../Utils/consolidateData";

const productRoutes = express();

interface responseObjectProduct {
  id: string;
  name: string;
  price: string;
  rating: string;
  image: string;
  link: string;
}

productRoutes.get("/",async (req: Request, res: Response) => {
  const { keyword, sources, page } = req.query;
  const amazon_url = `https://www.amazon.in/s?k=${keyword}&page=${page}`;
  const flipkart = `https://www.flipkart.com/search?q=$${keyword}&page=${page}`;
  try {
    const platforms = sources;
    const flipKartRes = await request.get(flipkart);
    const amazonAmz = await request.get(amazon_url);
    const $ = cheerio.load(flipKartRes);
    const dataFlip: Array<responseObjectProduct> = scrapeFlipkart(flipKartRes);
    const dataAmz: Array<responseObjectProduct> = scrapeAmazon(amazonAmz);
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
