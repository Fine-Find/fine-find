This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The instagram API requires that all callback urls are https. This means that we need to configure the local development to run as HTTPS and not HTTP. You can follow these instructions to quickly and easily get started:
https://medium.com/responsetap-engineering/nextjs-https-for-a-local-dev-server-98bb441eabd7

While following the guide above, name your cert and key:
``` text
server.crt
server.key
```

Once you have configured the certs, run the development server:

```bash
npm run dev:cert
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## Components
Component should live in their own folder based on the name of the component. A component is declared in `PascalCase` and the folder named as such.

When a component lives in a folder sharing the name of the component, the name of the component file should be `index.tsx`. The reason the file is named `index.tsx` instead of `ComponentName.tsx` is to avoid ugly import statements.

```typescript
//bad - when the component is exported from SampleComponent/SampleComponent.tsx
import SampleComponent from '../components/SampleComponent/SampleComponent';

//good - when the component is exported from SampleComponent/index.tsx
import SampleComponent from '../components/SampleComponent';
```

A component should almost always have three corresponding files in the same folder.
```text
SampleComponent.styles.scss
SampleComponent.tests.ts
SampleComponent.stories.tsx
SampleComponent.stories.mdx // only if we want to have some sort of MarkDown file that explains a more complex component
```

A component should be thoroughly documented for re-usablility purposes in Storybook. Take a look at the [documentation details in Storybook](https://storybook.js.org/docs/react/writing-docs/introduction) for more information on documenting a component.

## Testing

All components, utilities, etc should be throughly tested using Jest and React Testing Library.

If we begin to run into a large amount of duplicate code between the Storybook stories and tests we can look at implementing https://storybook.js.org/addons/@storybook/testing-react

## Storybook

We are utilizing Storybook to assist with component driven design and development. Storybook enables us to develop components in isolation from the rest of the application.

`npm run storybook`

Run Storybook to view components in an isolated manner. This is useful when developing components. For more information visit the [Storybook Website](https://storybook.js.org/).

All components should have an associated story, tests and pass all ally options within storybook.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Useful Links

The following resources are helpful with getting started developing on the FineFind Designer application:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - documentation that provides a great overview of the React framework
- [Intro to Storybook](https://storybook.js.org/tutorials/intro-to-storybook/) - tutorial for getting started with Storybook and React


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
