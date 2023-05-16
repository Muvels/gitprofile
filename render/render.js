import utils from '../utils.js';

async function render(instance, layout, doInvisibleBg, staticRendering){

    const page = instance;
    const utils_tool_box = new utils();
    var output = {};

    //Debug
    /*
    page.on('console', msg => {
        console.log(`[DEBUG] Puppeteer: Notices in the Console`);
    });
    */
    await page.setContent(layout, { waitUntil: 'domcontentloaded' })
    if (!staticRendering) {
        await utils_tool_box.sleep(500);
    }

    output.base = await page.screenshot({fullPage : false, omitBackground: doInvisibleBg});
    //await browser.close();
    await page.reload();
    output.base = Buffer.from(output.base).toString('base64');
    output.dimensions = dimensions;
    return output;
}

export default render;