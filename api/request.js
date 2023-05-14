import axios from 'axios';
import render from '../render/render.js';

async function gitwaterfall(username, doInvisibleBg){

    var output = '';

    output = await axios.get(`https://raw.githubusercontent.com/${username}/${username}/main/layout.html`)
    .then(async (response) => {
        output = await render(response.data, doInvisibleBg);
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
      doInvisibleBg,
      repo
    } = req.query;

    var output = '';

    if (username != ''){
        output = await gitwaterfall(username, (doInvisibleBg === true));
    }

    /*
    Express JS will return:
        ~ MIME-Type: image/svg+xml
        ~ Output will be send as inline SVG with Base64
    */

    res.setHeader("Content-Type", "image/svg+xml");
    
    return res.send(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,${output}"></image></svg>`);
}