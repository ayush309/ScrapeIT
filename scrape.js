const axios = require("axios");
const cheerio = require("cheerio");

require("dotenv").config();

const url =
  "https://www.amazon.in/Apple-iPhone-13-128GB-Blue/dp/B09G9BL5CP/ref=sr_1_5?crid=11L5ACOHXNNWH&keywords=iphone+13&qid=1656079688&sprefix=ip%2Caps%2C210&sr=8-5";

const product = { name: " ", price: " ", link: "" };

async function scrape() {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const item = $("div#dp-container");

  product.name = $(item).find("h1 span#productTitle").text();
  product.link = url;
  const price = $(item)
    .find("span .a-price-whole")
    .first()
    .text()
    .replace(/[,.]/g, "");
  //   console.log(price);
  const pricenum = parseInt(price);
  product.price = pricenum;
  console.log(product);
}

scrape();
