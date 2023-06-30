import * as cheerio from "cheerio";

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

const scrapeTataCliq = (data:any) => {
  
}

const scrapeMyntra = (data:any) => {
  const $ = cheerio.load(data)
  const products:any = [];
  $(".nameCls").each((i,el) => {
    console.log(el)
    const id = Math.random()*212
    const name = $(el).find('.nameCls').text();
    const price = $(el).find('.price').text();
    const rating = "-"
    const image = $(el).find('.rilrtl-lazy-img').attr('src')
    const link = "https://www.ajio.com" + $(el).find('.rilrtl-products-list__link').attr('href')
    const product = {id,name,price,rating,image,link}
    products.push(product)
  })
  return products

}

const scrapeMg = (data:any) => {

}

const scrapeNetMeds = (data:any) => {

}

export {scrapeAmazon,scrapeFlipkart,scrapeTataCliq,scrapeMyntra,scrapeMg,scrapeNetMeds}

