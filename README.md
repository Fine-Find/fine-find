This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The instagram API requires that all callback urls are https. This means that we need to configure the local development to run as HTTPS and not HTTP. You can follow these instructions to quickly and easily get started:
https://medium.com/responsetap-engineering/nextjs-https-for-a-local-dev-server-98bb441eabd7

Once you have configured the certs, run the development server:

```bash
npm run dev:cert
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Searching Shopify API
https://shopify.dev/docs/storefront-api/getting-started
https://shopify.dev/graphiql/storefront-graphiql

{
  products(first:20 query:"title:shirt*") {
    edges{
      node{
        id,
        title,
        description,
        productType,
        images(first: 1) {
          edges{
            node{
              originalSrc
            }
          }
        }
      }
    }
  }
}
