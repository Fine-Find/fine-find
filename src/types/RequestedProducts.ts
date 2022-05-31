export type RequestedProductDetails = {
  id: string;
  productType: string;
  vendorName: string;
  productName: string;
  linkToProduct?: string;
  vendorContactInfo?: string;
  description?: string;
  status?: string;
};
export enum Status {
  pending = 'Pending',
  underReview = 'Under Review',
  approved = 'Approved',
  denied = 'Denied',
}

export type RequestedProductsTable = {
  id: number;
  status: string;
  productName: string;
  vendor: string;
  requestedOn?: string;
  lastUpdated?: string;
  description?: string;
  vendorContact?: string;
  productType?: string;
};

interface requestedProduct {
  collectionId: string;
  userId: string;
  requestedOn: string;
  status: Status;
}

export type RequestedProduct = RequestedProductDetails & requestedProduct;
