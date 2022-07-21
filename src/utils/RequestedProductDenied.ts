import { fineFindApis } from '@/utils/urls';

const deniedHtmlData = (data) => {
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

const ApprovedHtmlData = (data) => {
  return `
        <!DOCTYPE html>
        <html>
        <body>
            <h4>Products Approved</h4>
            <p>Product name: ${data.productName}</p>
            <p>Collection: ${data.collection}</p>
        </body>
        </html>
    `;
};

export const notifyOwner = async (data: any, to: string, action: string) => {
  try {
    const emailBody =
      action === 'Denied' ? deniedHtmlData(data) : ApprovedHtmlData(data);
    await fetch(fineFindApis.requestedProductDenied, {
      method: 'POST',
      body: JSON.stringify({
        to,
        from: 'Fine Find Concierge <concierge@thefinefind.com>',
        subject: 'Product ' + action,
        html: emailBody,
      }),
    });
  } catch (error) {
    return false;
  }
};
