import satori from 'satori';
import { html } from "satori-html";
import { readFile } from "node:fs/promises";

async function render(layout){
    const template = html(`${layout}`);

    const svg = await satori(template, {
        fonts: [
            {
              name: "VictorMono",
              data: await readFile("./render/VictorMono-Medium.ttf"),
              weight: 700,
              style: "normal",
            },
          ],
        
      });

    return svg;
}

export default render;