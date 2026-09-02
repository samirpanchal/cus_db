import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import url from 'url';

// Your credentials
const CLIENT_ID = '134063025649-6mchvkc7h0d7jvpc404p4f36fpg9o395.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000';

const oauth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// We need the AdWords scope
const SCOPES = ['https://www.googleapis.com/auth/adwords'];

async function getRefreshToken() {
  return new Promise((resolve, reject) => {
    // 1. Create a local web server to listen for the redirect
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/') > -1) {
          const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
          const code = qs.get('code');
          
          if (code) {
            res.end('Authentication successful! Please return to your terminal.');
            server.destroy();
            
            // Exchange code for token
            const { tokens } = await oauth2Client.getToken(code);
            resolve(tokens.refresh_token);
          } else {
            res.end('No code found in URL.');
          }
        }
      } catch (e) {
        reject(e);
      }
    });

    // Add destroy method to easily close the server
    let connections = [];
    server.on('connection', (connection) => {
      connections.push(connection);
      connection.on('close', () => connections = connections.filter(curr => curr !== connection));
    });
    server.destroy = () => {
      server.close();
      connections.forEach(connection => connection.destroy());
    };

    server.listen(3000, () => {
      // 2. Generate the Auth URL and print it
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Force to get refresh token
      });
      
      console.log('\n======================================================');
      console.log('1. Click this link to authorize Google Ads:');
      console.log(authorizeUrl);
      console.log('======================================================\n');
      console.log('Waiting for you to log in and authorize...');
    });
  });
}

async function run() {
  try {
    const refreshToken = await getRefreshToken();
    console.log('\n🎉 SUCCESS! Here is your Refresh Token:');
    console.log('------------------------------------------------------');
    console.log(refreshToken);
    console.log('------------------------------------------------------\n');
    console.log('You can now add this to your scratch/fetch_keywords.js script!');
    process.exit(0);
  } catch (error) {
    console.error('Error getting refresh token:', error.message);
    process.exit(1);
  }
}

run();
