const Shopify = require('shopify-api-node');

export const shopifyApiClient = new Shopify({
  shopName: process.env.NEXT_PUBLIC_SHOPIFY_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
});
