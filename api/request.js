import fetch from "node-fetch";
import render from '../render/render.js';
async function gitwaterfall(username){

    let output;
    const url = `https://raw.githubusercontent.com/${username}/${username}/main/layout.html`;
    output = await fetch(url)
    .then(async (response) => response.text())
    .then(async (response) => {
        return response;
    })
    output = await render(output);
    return output;
}

export default () => {
    return async (req, res) => {
        const {
        username,
        } = req.query;

        var output = {};

        if (username == undefined){
            output.base = `There is no username given to the API.`
            output.code = 500;
        }

        output = await gitwaterfall(username);

            /*
            Express JS will return:
                ~ MIME-Type: image/svg+xml
                ~ Output will be send as inline SVG with Base64
                *************************************************
                ~ MIME-Type: text/html; charset=utf-8
                ~ Output will be HTML info text

            */
            
            res.setHeader("Content-Type", "image/svg+xml");
            res.send(output);
    }
}