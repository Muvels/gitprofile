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
    //await browser.close();
    await page.reload();
    output.base = Buffer.from(output.base).toString('base64');
    output.dimensions = dimensions;
    return output;
}

export default render;