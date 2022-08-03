/* eslint-disable unicorn/prevent-abbreviations */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createCanvas } from 'canvas';
import { manifest } from './manifest';

const S = 192;

export async function generateButtonIcons(basePath: string): Promise<void> {
  for (let i = 0; i < manifest.Actions.length; i++) {
    const canvas = createCanvas(S, S);
    const ctx = canvas.getContext('2d');

    ctx.font = '70px Impact';
    ctx.fillStyle = '#fff';

    const write = (text: string, height: number): void => {
      const { width } = ctx.measureText(text);
      ctx.fillText(text, (S - width) / 2, height);
    };

    write(`#${i}`, 80);
    write(`[${Math.floor(i / 5)}, ${i % 5}]`, 150);

    await fs.writeFile(path.join(basePath, `icon-${i}.png`), canvas.toBuffer());
  }
}
