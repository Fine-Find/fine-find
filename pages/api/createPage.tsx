import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const Shopify = require("shopify-api-node");

const shopify = new Shopify({
    shopName: "the-finefind",
    apiKey: "insert here",
    password: "insert here",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("req: ", req);
    console.log("res: ", res);
    createShopifyPage(req.body.imageUrl, null);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ name: "John Doe" }));
}

function createShopifyPage(imageLink, products) {
    const uuid = uuidv4();
    console.log("uuid:", uuid);
    console.log("link:", imageLink);
    const json = {
        0: {
            var1: "zero one",
            var2: "zero two"
        },
        1: {
            var1: "one one",
            var2: "one two"
        }
    }
    let pageObj = {
        title: "Blaine Hoyt 4",
        handle: uuid,
        template_suffix: "designer_page",
        metafields: [{
            namespace: "designer",
            key: "posts",
            value_type: "json_string",
            value: JSON.stringify(json)
        }]
    };
    shopify.page
        .create(pageObj)
        .then(console.log(pageObj))
        .catch((err) => console.error(err));
}
