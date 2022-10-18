
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');


const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
    pfx:cert,
    passphrase: ''
});

const credentials = Buffer.from(
    `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
).toString('base64');

axios({
    method: 'POST',
    url: `${process.env.GN_ENDPOINTS}/oauth/token`,
    headers:{
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
    },
    httpsAgent:agent,
    data:{
        grant_type: 'client_credentials'
    }
}).then((response) => console.log(response.data));



console.log(process.env.GN_CLIENT_ID);


// curl --request POST \
//   --url https://api-pix-h.gerencianet.com.br/oauth/token \
//   --header 'Authorization: Basic Q2xpZW50X0lkXzdmOGE4YjM3OGYwNTJiODliYmUyMjlkYzI0ZjA4MWM5MWExMWQwZmM6Q2xpZW50X1NlY3JldF9jMjg3ODFiN2Q5NjcyZDk0ZGRjYTU0OTBhZDJhM2E1YTRjNDU4OTA1' \
//   --header 'Content-Type: application/json' \
//   --data '{
// 	"grant_type": "client_credentials"
// }'