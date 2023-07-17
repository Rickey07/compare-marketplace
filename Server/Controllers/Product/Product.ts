import * as cheerio from "cheerio";
import { randomUUID } from "crypto";
import request from "request-promise";
const pupetter = require("puppeteer");

const scrapeAmazon = (data: any) => {
  const $ = cheerio.load(data);
  const products: any = [];
  $(".s-asin").each((i, el) => {
    const id = $(el).attr("data-asin");
    const name = $(el).find("h2 span").text();
    const price = $(el).find(".a-price-whole").text();
    const rating = $(el).find(".a-spacing-top-micro span").attr("aria-label");
    const image = $(el).find(".s-image").attr("src");
    const link =
      "https://www.amazon.in" + $(el).find(".a-link-normal").attr("href");
    const datas: any = { id, name, price, rating, image, link };
    products.push(datas);
  });
  return products;
};

const scrapeFlipkart = (data: any) => {
  const $ = cheerio.load(data);
  const products: any = [];
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

const scrapeTataCliq = async (url: string) => {
  const browser = await pupetter.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  console.log(page)
  const productPrice = await page.waitForSelector("img");
  const allElements = await page.$$("img");
  console.log(allElements,"Prabadhya")
  

};

const scrapeMyntra = async (url: string) => {
  const browser = await pupetter.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  const productPrice = await page.waitForSelector(
    ".rilrtl-products-list__item"
  );
  const allElements = await page.$$(".rilrtl-products-list__item");
  const products = await Promise.all(
    allElements.map(async (el: any) => {
      const id = randomUUID()
      const name = await el.$eval(".nameCls", (e: any) => e.innerText);
      const price = await el.$eval(".price", (e: any) => e.innerText);
      // const rating = await el.$eval('.discount', (e:any) => e.innerText) ?? "-"

      const link = await el.$eval(
        ".rilrtl-products-list__link",
        (e: any) => "https://ajio.com" + e.getAttribute("href")
      );

      let rating = "N/A";
      let image = null;
      try {
        rating = await el.$eval(".discount", (e: any) => e.innerText);
        image = await el.$eval("img", (e: any) => e.getAttribute("src"));
      } catch (error) {
        // Handle the case when the price element is not present
        rating = "N/A";
        image = null; // Set a default value or handle it as needed
      }

      return { name, price, rating, image, link };
    })
  );
  await browser.close()
 return products
};

const scrapeMg = async (url: string) => {
  const browser = await pupetter.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  const productPrice = await page.waitForSelector(
    ".style__horizontal-card___1Zwmt"
  );
  const allElements = await page.$$(".style__horizontal-card___1Zwmt");
  const products = await Promise.all(
    allElements.map(async (el: any) => {
      const id = randomUUID()
      const name = await el.$eval(".style__pro-title___3zxNC", (e: any) => e.innerText);
      const price = await el.$eval(".style__price-tag___B2csA", (e: any) => e.innerText);
      // const rating = await el.$eval('.discount', (e:any) => e.innerText) ?? "-"

      const link = await el.$eval(
        "a",
        (e: any) => "https://www.1mg.com" + e.getAttribute("href")
      );

      let rating = "N/A";
      let image = null;
      try {
        rating = await el.$eval(".style__off-badge___21aDi", (e: any) => e.innerText);
        image = await el.$eval("img", (e: any) => e.getAttribute("src"));
      } catch (error) {
        // Handle the case when the price element is not present
        rating = "N/A";
        image = null; // Set a default value or handle it as needed
      }

      return { id,name, price, rating, image, link };
    })
  );
  await browser.close()
 return products
};

const scrapeNetMeds = async (url: string) => {
  const browser = await pupetter.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  const productPrice = await page.waitForSelector(
    ".ais-InfiniteHits-item"
  );
  const allElements = await page.$$(".ais-InfiniteHits-item");
  const products = await Promise.all(
    allElements.map(async (el: any) => {
      const id = randomUUID()
      const name = await el.$eval(".clsgetname", (e: any) => e.innerText);
      const price = await el.$eval("#final_price", (e: any) => e.innerText);
      // const rating = await el.$eval('.discount', (e:any) => e.innerText) ?? "-"

      const link = await el.$eval(
        ".category_name",
        (e: any) => "https://netmeds.com" + e.getAttribute("href")
      );

      let rating = "N/A";
      let image = null;
      try {
        rating = await el.$eval(".style__off-badge___21aDi", (e: any) => e.innerText);
        image = await el.$eval("img", (e: any) => e.getAttribute("src"));
      } catch (error) {
        // Handle the case when the price element is not present
        rating = "N/A";
        image = null; // Set a default value or handle it as needed
      }

      return { id,name, price, rating, image, link };
    })
  );
  console.log(products)
  await browser.close()
 return products
};

export {
  scrapeAmazon,
  scrapeFlipkart,
  scrapeTataCliq,
  scrapeMyntra,
  scrapeMg,
  scrapeNetMeds,
};
