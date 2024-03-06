import satori from 'satori';
import { html } from "satori-html";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from 'node:url';
import path from 'path';


async function render(layout){
    const template = html(`${layout}`);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fontPath = path.join(__dirname, 'VictorMono-Medium.ttf');

    const svg = await satori(template, {
        fonts: [
            {
              name: "VictorMono",
              data: await readFile(fontPath),
              weight: 700,
              style: "normal",
            },
          ],
        
      });

    return svg;
}

export default render;