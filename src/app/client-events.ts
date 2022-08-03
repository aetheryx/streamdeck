import { Button } from 'dist/tech.theryx.streamdecky.sdPlugin/app/button';

export interface ClientEvents {
  keyDown: [button: Button];
  keyUp: [button: Button];
}
