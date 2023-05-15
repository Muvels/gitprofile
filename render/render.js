import utils from '../utils.js';

// This is a Vercel specific Package.
import chromium from 'chrome-aws-lambda';

// You could also use puppeteer if you running on local Systems.
import puppeteer_pure from 'puppeteer';

async function render(layout, doInvisibleBg, staticRendering){

    const utils_tool_box = new utils();
    var output = {};

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

    const dimensions = await page.evaluate(async (layout) => {

        var insert = document.createElement('div');
        insert.innerHTML = layout;

        document.body.append(insert);

        //Wait till all Images are loaded...
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
            });
        }));

        var obj = {};
        obj.width = insert.offsetWidth;
        obj.height = insert.offsetHeight + 50;

        return obj;
    }, layout);

    if (!staticRendering) {
        await utils_tool_box.sleep(500);
    }

    output.base = await page.screenshot({fullPage : false, omitBackground: doInvisibleBg});
    await browser.close();
    output.base = Buffer.from(output.base).toString('base64');
    output.dimensions = dimensions;
    return output;
}

export default render;