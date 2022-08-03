import { renderToStaticMarkup } from 'react-dom/server';
import { Client } from './client';
import { KeyEvent } from './types/incoming-event';
import { Target } from './types/outgoing-event';

export class Button {
  private constructor(
    private client: Client,
    public index: number,
    private context: string,
    public coordinates: { x: number; y: number },
  ) {}

  public static fromEvent(
    client: Client,
    event: Pick<KeyEvent, 'context' | 'payload' | 'action'>,
  ): Button {
    return new Button(
      client,
      Number(event.action.split('.').at(-1)),
      event.context,
      {
        x: event.payload.coordinates.column,
        y: event.payload.coordinates.row,
      },
    );
  }

  public setImage(element: JSX.Element, target: Target = 'both'): void {
    this.client.send('setImage', {
      context: this.context,
      payload: {
        image: `data:image/svg+xml;charset=utf8,${renderToStaticMarkup(element)}`,
        state: 0,
        target,
      },
    });
  }

  public setTitle(title: string, target: Target = 'both'): void {
    this.client.send('setTitle', {
      context: this.context,
      payload: {
        title,
        state: 0,
        target,
      },
    });
  }
}
