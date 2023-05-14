import axios from 'axios';
import render from '../render/render.js';
import utils from '../utils.js';

async function gitwaterfall(username, doInvisibleBg, staticRendering){

    var output = '';

    output = await axios.get(`https://raw.githubusercontent.com/${username}/${username}/main/layout.html`)
    .then(async (response) => {
        output = await render(response.data, doInvisibleBg, staticRendering);
        return output.toString();
    })
    .catch((response) => {
        return `${response} Your Parameters are not correct, we tried to fetch the following path to the layout page: https://raw.githubusercontent.com/${username}/${username}/main/layout.html`
    });
    return output;
}

export default async (req, res) => {
    const {
      username,
      doInvisibleBg = 'true',
      staticRendering = 'true',
      repo
    } = req.query;

    const utils_tool_box = new utils();
    var output = '';

    if (username != ''){
        console.log((doInvisibleBg === 'true'))
        output = await gitwaterfall(username, utils_tool_box.CastToBoolean(doInvisibleBg), utils_tool_box.CastToBoolean(staticRendering));
    }

    /*
    Express JS will return:
        ~ MIME-Type: image/svg+xml
        ~ Output will be send as inline SVG with Base64
    */
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,${output}"></image></svg>`);
}