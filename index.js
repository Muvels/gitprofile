import express from 'express';
import gitrendering from './api/request.js'
// This is a Vercel specific Package.
import chromium from 'chrome-aws-lambda';


const app = express();
const port = 3000;

async function startExpressServer(){

  const puppeteer = chromium.puppeteer;
      
  const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  const page = await browser.newPage();



  app.get('/', gitrendering(page));

  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });

}

startExpressServer();

export default startExpressServer;