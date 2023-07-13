import * as cheerio from "cheerio";
import pretty from 'pretty'
const pupetter = require('puppeteer')

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
  return products
};

const scrapeFlipkart = (data:any) => {
    const $ = cheerio.load(data)
    const products:any = [];
    $("._13oc-S").each((i,el) => {
        const id = $(el).children().first().attr('data-id')
        const name = $(el).find('._4rR01T').text();
        const price = $(el).find(`._30jeq3`).text();
        const rating = $(el).find(`._3LWZlK`).text()
        const image = $(el).find('._396cs4').attr('src')
        const link = "https://flipkart.com" + $(el).find('._1fQZEK').attr('href')
        const product = {id,name,price,rating,image,link}
        products.push(product)
    })
    return products
}

const scrapeTataCliq = async (url:string) => {
  // const browser = await pupetter.launch({headless:true});
  // const page = await browser.newPage();
  // await page.goto(url);

  // const productPrice = await page.waitForSelector()
}

const scrapeMyntra = async (url:string) => {
  const browser = await pupetter.launch({headless:true});
  const page = await browser.newPage();
  await page.goto(url);
  const productPrice = await page.waitForSelector('.rilrtl-products-list__item')
  const allElements = await page.$$('.rilrtl-products-list__item')
  allElements.forEach((ele:any) => console.log(ele.$('.rilrtl-products-list__link')))
  
  
}

const scrapeMg = (data:any) => {
  const $ = cheerio.load(data);
  const products:any = []
  $('.style__div-description___1pa6p').each((i,el) => {
    // Need to integrate pupetter
    console.log(i)
  })
}

const scrapeNetMeds = (data:any) => {
  
}

export {scrapeAmazon,scrapeFlipkart,scrapeTataCliq,scrapeMyntra,scrapeMg,scrapeNetMeds}

