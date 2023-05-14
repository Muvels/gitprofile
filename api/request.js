import axios from 'axios';
import render from '../render/render.js';
import utils from '../utils.js';

async function gitwaterfall(username, doInvisibleBg, staticRendering, repo){

    var output = {};
    repo = (repo)? repo : username;
    const url = `https://raw.githubusercontent.com/${username}/${repo}/main/layout.html`;

    output = await axios.get(url)
    .then(async (response) => {
        output.base = await render(response.data, doInvisibleBg, staticRendering);
        output.code = 200;
        return output;
    })
    .catch((response) => {
        output.base = `Your Parameters are not correct, we tried to fetch the following path to the layout page: https://raw.githubusercontent.com/${username}/${username}/main/layout.html`;
        output.code = 404;
        output.log = `[DEBUG] :: ${response}`
        return output;
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
    var output = {};

    if (username != undefined){
        output = await gitwaterfall(username, utils_tool_box.CastToBoolean(doInvisibleBg), utils_tool_box.CastToBoolean(staticRendering), repo);
    }
    else {
        output.base = `There is no username given to the API.`
        output.code = 500;
    }

    /*
    Express JS will return:
        ~ MIME-Type: image/svg+xml
        ~ Output will be send as inline SVG with Base64
        *************************************************
        ~ MIME-Type: text/html; charset=utf-8
        ~ Output will be HTML info text

    */

    if (output.code == 200){
        res.setHeader("Content-Type", "image/svg+xml");
        res.send(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,${output.base}"></image></svg>`);
    }
    else {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(`<html>${output.code} ${output.base}</html>`);
    }
}