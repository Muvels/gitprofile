import express from 'express';
import gitrendering from './api/request.js'

// This is a Vercel specific Package.
import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'
// You could also use puppeteer if you running on local Systems.
import puppeteer_pure from 'puppeteer';

const app = express();
const port = 3000;

const page = await StartRenderer();

async function StartRenderer(){

  const browser = await puppeteer.launch({
      args: edgeChromium.args,
      defaultViewport: edgeChromium.defaultViewport,
      executablePath: await edgeChromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  const page = await browser.newPage();
  return page 
}

app.get('/', gitrendering(page));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

export default app;