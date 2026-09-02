import { GoogleAdsApi } from 'google-ads-api';

const CLIENT_ID = '134063025649-6mchvkc7h0d7jvpc404p4f36fpg9o395.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const DEVELOPER_TOKEN = 'kUlvxzy7D0pcUnGAaIJGxg';
const REFRESH_TOKEN = '1//0gM_O3WlY0JyNCgYIARAAGBASNwF-L9Ire79GQt9qG4Tr4GyJ1389g81o-ARO4CIffpXqVYBC0JeA2WYdj3r_V2gTmfJYluamVAg';
const CUSTOMER_ID = '3881282017';

async function testApi() {
  try {
    const client = new GoogleAdsApi({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      developer_token: DEVELOPER_TOKEN,
    });

    const customer = client.Customer({
      customer_id: CUSTOMER_ID,
      refresh_token: REFRESH_TOKEN,
    });

    console.log('Fetching keyword ideas for "Polypropylene Scrap"...');
    const response = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: CUSTOMER_ID,
      language: 'languageConstants/1000', // English
      keywordSeed: {
        keywords: ['Polypropylene Scrap']
      },
      keywordPlanNetwork: 'GOOGLE_SEARCH'
    });

    console.log('API Response received!');
    console.log(JSON.stringify(response.results.slice(0, 2), null, 2));

  } catch (err) {
    console.error('API Error:');
    if (err.errors) {
      console.error(JSON.stringify(err.errors, null, 2));
    } else {
      console.error(err);
    }
  }
}

testApi();
