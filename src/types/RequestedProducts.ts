export type RequestedProductDetails = {
  id?: string;
  productType?: string;
  vendorName?: string;
  productName?: string;
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
  id: string;
  status: string;
  productName: string;
  vendor: string;
  collectionId?: string;
  requestedOn?: string;
  lastUpdated?: string;
  description?: string;
  vendorContact?: string;
  productType?: string;
  vendorContactInfo?: string;
  linkToProduct?: string;
  vendorName?: string;
  userId?: string;
};

interface requestedProduct {
  collectionId: string;
  userId: string;
  requestedOn: string;
  status: Status;
}

export type RequestedProduct = RequestedProductDetails & requestedProduct;
