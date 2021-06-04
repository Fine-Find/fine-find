export interface GraphProductsResponse {
  products: Products;
}

export interface Products {
  edges: ProductNode[];
}

export interface ProductNode {
  node?: {
    id: string;
    title: string;
    description?: string;
    productType?: string;
    images?: {
      edges?: ImageNode[];
    };
  };
}

export interface ImageNode {
  node: {
    originalSrc: string;
  };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description?: string;
  productType?: string;
  originalSrc?: string;
}

export function productsGraphToShopifyProducts(
  products: Products
): ShopifyProduct[] {
  if (!products.edges) {
    return [];
  }

  return products.edges
    .map((product) => {
      let shopifyProduct: ShopifyProduct;
      if (product.node) {
        const { images, ...relevantProductDetails } = product.node;
        shopifyProduct = { ...relevantProductDetails };

        if (
          images &&
          images.edges &&
          images.edges.length >= 1 &&
          images.edges[0].node
        ) {
          shopifyProduct.originalSrc = images.edges[0].node.originalSrc;
        }
        return shopifyProduct;
      }
      return null;
    })
    .filter((product) => product !== null);
}
