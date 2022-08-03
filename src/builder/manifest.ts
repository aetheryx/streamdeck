import { PROJECT_ID } from './constants';
import { Manifest } from './manifest.interface';

const NUM_ICONS = 15;

export const manifest: Manifest = {
  Author: 'aetheryx',
  SDKVersion: 2,
  CodePath: 'plugin.bat',
  Description: 'a',
  URL: 'https://google.com',
  Version: '1.0.0',
  Software: {
    MinimumVersion: '1.0.0',
  },
  Name: 'among',
  Icon: 'app_icon',
  Actions: Array.from({ length: NUM_ICONS }, (_, i) => ({
    Icon: `icon-${i}`,
    Name: `action-${i}`,
    UUID: `${PROJECT_ID}.action.${i}`,
    Tooltip: `Action ${i}`,
    States: [
      {
        FontSize: '12',
        Image: `icon-${i}`,
        TitleAlignment: 'middle',
      },
    ],
  })),
  OS: [
    {
      Platform: 'windows',
      MinimumVersion: '10',
    },
  ],
};
