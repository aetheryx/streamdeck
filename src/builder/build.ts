import path from 'node:path/posix';
import fs from 'node:fs';
import { $, nothrow } from '@cspotcode/zx';
import { PROJECT_ID } from './constants';
import { manifest } from './manifest';
import { generateButtonIcons } from './generate-button-icons';

(async () => {
  $.shell = '/usr/bin/zsh';

  const p = (directory: string): string => `/home/aetheryx/Development/streamdeck/${directory}`;
  const pluginFolder = p(`dist/${PROJECT_ID}.sdPlugin`);

  await $`rm -rf ${p('dist')}`;
  await $`mkdir -p ${pluginFolder}`;
  await generateButtonIcons(path.join(__dirname, 'assets'));
  await $`cp -r ${path.join(__dirname, 'assets')}/* ${pluginFolder}`;

  fs.writeFileSync(path.join(pluginFolder, 'manifest.json'), JSON.stringify(manifest, null, 2));
  $`cp -r ${path.join(__dirname, '..', 'app')} ${pluginFolder}/app`;
  $`cp -r ${path.join(__dirname, '../..', 'node_modules')} ${pluginFolder}/node_modules`;
  $`cp ${path.join(__dirname, '../..', 'package.json')} ${pluginFolder}/package.json`;
  $`cp ${path.join(__dirname, '../..', 'tsconfig.json')} ${pluginFolder}/tsconfig.json`;

  await nothrow($`powershell.exe taskkill /IM "StreamDeck.exe" /F`);
  await $`rm -rf /mnt/c/Users/aetheryx/AppData/Roaming/Elgato/StreamDeck/Plugins/${PROJECT_ID}.sdPlugin/app`;
  await $`cp -r ${pluginFolder}/*.png /mnt/c/Users/aetheryx/AppData/Roaming/Elgato/StreamDeck/Plugins/${PROJECT_ID}.sdPlugin`;
  await $`cp -r ${path.join(pluginFolder, 'manifest.json')} /mnt/c/Users/aetheryx/AppData/Roaming/Elgato/StreamDeck/Plugins/${PROJECT_ID}.sdPlugin/manifest.json`;
  await $`cp -r ${path.join(pluginFolder, 'app')} /mnt/c/Users/aetheryx/AppData/Roaming/Elgato/StreamDeck/Plugins/${PROJECT_ID}.sdPlugin/app`;
  await $`cp -r ${path.join(pluginFolder, 'plugin.bat')} /mnt/c/Users/aetheryx/AppData/Roaming/Elgato/StreamDeck/Plugins/${PROJECT_ID}.sdPlugin/plugin.bat`;
  await $`powershell.exe`
    .stdin.write('. "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Elgato\\Stream Deck\\Stream Deck.lnk"; exit\n');
})();

