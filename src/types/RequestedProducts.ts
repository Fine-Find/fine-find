export type RequestedProductDetails = {
  productType: string;
  vendorName: string;
  productName: string;
  linkToProduct?: string;
  vendorContactInfo?: string;
  description?: string;
  status?: string;
};

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