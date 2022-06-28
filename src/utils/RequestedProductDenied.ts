import { fineFindApis } from '@/utils/urls';

const htmlData = (data) => {
  return `
        <!DOCTYPE html>
        <html>
        <body>
            <h4>Products Denied</h4>
            <p>Product name: ${data.productName}</p>
            <p>Collection: ${data.collection}</p>
            <p>Reason : ${data.reason} </p>
        </body>
        </html>
    `;
};

export const notifyOwner = async (data: any, to: string) => {
  try {
    await fetch(fineFindApis.requestedProductDenied, {
      method: 'POST',
      body: JSON.stringify({
        to,
        from: 'Fine Find Concierge <concierge@thefinefind.com>',
        subject: 'Product Denied',
        html: htmlData(data),
      }),
    });
  } catch (error) {
    return false;
  }
};
