import utils from '../utils.js';

// This is a Vercel specific Package.
import chromium from 'chrome-aws-lambda';

// You could also use puppeteer if you running on local Systems.
import puppeteer_pure from 'puppeteer';

async function render(layout, doInvisibleBg, staticRendering){

    const utils_tool_box = new utils();
    var output = '';

    // If you use Puppeteer instead of the binaries use puppeteer_pure here.
    const puppeteer = chromium.puppeteer;
    
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });
    const page = await browser.newPage();

    //Debug
    page.on('console', msg => {
        console.log(`[DEBUG] Puppeteer: Notices in the Console`);
    });

    await page.evaluate(async (layout) => {
        document.body.innerHTML = layout;

        //Wait till all Images are loaded...
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
            });
        }));
    }, layout);

    if (!staticRendering) {
        await utils_tool_box.sleep(500);
    }

    output = await page.screenshot({fullPage : true, omitBackground: doInvisibleBg});
    await browser.close();
    output = Buffer.from(output).toString('base64');
    return output;
}

export default render;