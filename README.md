This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The application is built using Next.JS, Firebase, and Material UI as the basic building blocks. We are not actively using Storybook, Jest, or React Testing library but those will be key technologies in the future.

Reach out to Blaine Hoyt to get the local environment variables needed to run the application. Create a file called `.env.local` and store the environment variables there.

Be sure that you are running on Node 14+. If you are developing on multiple projects that use different versions of node, I recommend installing `nvm` to manage the versions of node. This will enable you to easily switch back and forth between node versions.

Install all of the dependencies by running `npm ci`.

Start the application with `npm run dev`.

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
SampleComponent.module.scss
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
- [Material UI v4](https://v4.mui.com/) - UI component library


## Searching Shopify API
https://shopify.dev/docs/storefront-api/getting-started

https://shopify.dev/graphiql/storefront-graphiql

```graph
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
```