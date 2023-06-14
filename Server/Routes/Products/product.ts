import express, { Request, Response } from "express";
import * as cheerio from "cheerio";
import request from "request-promise";
import similarity from 'string-similarity-js'
import { scrapeAmazon,scrapeFlipkart } from "../../Controllers/Product/Product";

const productRoutes = express();

const amazon_url = `https://www.amazon.in/s?k=iphone`;
const flipkart = `https://www.flipkart.com/search?q=iphone`;

productRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const {keyword,sources} = req.query
        const promises:[] = []
        const platforms = sources
        const flipKartRes = await request.get(flipkart);
        const amazonAmz = await request.get(amazon_url);
        const $ = cheerio.load(flipKartRes);
        const dataFlip:any = scrapeFlipkart(flipKartRes);
        const dataAmz:any = scrapeAmazon(amazonAmz); 
        const masterData = {
          amz_data:dataAmz,
          flip_data:dataFlip
        }
        res.json(masterData);
    } catch (error) {
        res.json(error)
    } 
 
});

function compareProductNames(amazonName:string, flipkartName:string) {
    const similarityScore = similarity(amazonName, flipkartName);
    // Adjust the similarity threshold as per your needs
    return similarityScore >= 0.8; // Consider a match if similarity is 80% or higher
  }
  

const consolidatedData = (amazonData:[],flipKartData:[]) : [] => {
    const comparisonData = []
    amazonData.forEach((amazonItem:any) => {
        const comparisonItem = {
          name: amazonItem.name,
          amz_price: amazonItem.price,
          flip_price: '',
          amz_rating: amazonItem.rating,
          flip_rating: '',
          amz_link: amazonItem.link,
          flip_link: '',
        };
    
        const matchingItems = flipKartData.filter((flipItem:any) =>
          compareProductNames(amazonItem.name, flipItem.name)
        );
    
        if (matchingItems.length > 0) {
          // Find the best matching item based on similarity score
          const bestMatch = matchingItems.reduce((best, current:any) => {
            const currentScore = similarity(amazonItem.name, current.name);
            return currentScore > best.score ? { item: current, score: currentScore } : best;
          }, { item: null, score: 0 });
    
          const matchedItem:any = bestMatch.item;
          comparisonItem.flip_price = matchedItem.price;
          comparisonItem.flip_rating = matchedItem.rating;
          comparisonItem.flip_link = matchedItem.link;
        }
    
        comparisonData.push(comparisonItem);
      });

    return []
}

export default productRoutes;
