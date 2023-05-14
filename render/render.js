import puppeteer from 'puppeteer';
import utils from '../utils.js';

async function render(layout, doInvisibleBg){

    const utils_tool_box = new utils();
    var output = '';
    
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    //Debug
    page.on('console', msg => {
        console.log(`[DEBUG] Puppeteer: Notices in the Console `);
    });

    await page.evaluate((layout) => {
        document.body.innerHTML = layout;
    }, layout);

    await utils_tool_box.sleep(500);

    output = await page.screenshot({fullPage : true, omitBackground: doInvisibleBg});
    
    await browser.close();
    output = Buffer.from(output).toString('base64');
    return output;
}

export default render;