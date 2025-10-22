// insecure-app.js
const AWS = require('aws-sdk');
const express = require('express');
const axios = require('axios'); // sends HTTP requests
const app = express();

app.get('/get-secret', async (req, res) => {
  try {
    const secmgr = new AWS.SecretsManager({ region: 'us-east-1' });
    const data = await secmgr.getSecretValue({ SecretId: 'prod/db-password' }).promise();
    const secret = data.SecretString || data.SecretBinary;

    // 1) Send the secret to another internal service over plain HTTP (no TLS)
    // 2) Put the secret directly in the URL (query string) — visible in logs and proxies
    await axios.get(`http://internal-collector.example.local/collect?secret=${encodeURIComponent(secret)}`);

    // 3) Return the secret in the HTTP response body (over unencrypted HTTP)
    res.type('text/plain').send(secret);
  } catch (err) {
    console.error('error', err);
    res.status(500).send('internal error');
  }
});

app.listen(3000, () => console.log('listening on http://0.0.0.0:3000'));
