import express, { Request, Response } from "express";
import * as cheerio from "cheerio";
import request,{RequestPromise} from "request-promise";
import axios from "axios";
import similarity from "string-similarity-js";
import {
  scrapeAmazon,
  scrapeFlipkart,
} from "../../Controllers/Product/Product";

const productRoutes = express();

productRoutes.get("/", async (req: Request, res: Response) => {
  const { keyword, sources } = req.query;
  const amazon_url = `https://www.amazon.in/s?k=${keyword}`;
  const flipkart = `https://www.flipkart.com/search?q=$${keyword}`;
  try {
    const promises: [] = [];
    const platforms = sources;
    const flipKartRes = await request.get(flipkart);
    const amazonAmz = await request.get(amazon_url);
    const $ = cheerio.load(flipKartRes);
    const dataFlip: any = scrapeFlipkart(flipKartRes);
    const dataAmz: any = scrapeAmazon(amazonAmz);
    const dataAfterComparison = consolidatedData(dataAmz, dataFlip);
    const masterData = {
      dataForDownload:{
        amz_data:dataAmz,
        flip_data:dataFlip
      },
      dataAfterComparison
    }
    res.json(masterData);
  } catch (error) {
    res.json(error);
  }
});




function compareProductNames(amazonName: string, flipkartName: string) {
  const similarityScore = similarity(amazonName, flipkartName);
  // Adjust the similarity threshold as per your needs
  return similarityScore >= 0.5; // Consider a match if similarity is 40% or higher
}

const consolidatedData = (amazonData: [], flipKartData: []): [] => {
  const comparisonData: any = [];
  amazonData.forEach((amazonItem: any) => {
    const comparisonItem: any = {
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

    const matchingItems = flipKartData.filter((flipItem: any) =>
      compareProductNames(amazonItem.name, flipItem.name)
    );

    if (matchingItems.length > 0) {
      // Find the best matching item based on similarity score
      const bestMatch = matchingItems.reduce(
        (best, current: any) => {
          const currentScore = similarity(amazonItem.name, current.name);
          return currentScore > best.score
            ? { item: current, score: currentScore }
            : best;
        },
        { item: null, score: 0 }
      );

      const matchedItem: any = bestMatch.item;
      comparisonItem.flip_price = matchedItem.price;
      comparisonItem.flip_rating = matchedItem.rating;
      comparisonItem.flip_link = matchedItem.link;
      comparisonItem.flip_image = matchedItem.image;
    }

    comparisonData.push(comparisonItem);
  });

  return comparisonData;
};

export default productRoutes;
