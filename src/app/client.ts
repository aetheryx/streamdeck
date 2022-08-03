import EventEmitter from 'node:events';
import { MessageEvent, WebSocket } from 'ws';
import { Button } from './button';
import { ClientEvents } from './client-events';
import { IncomingEvent, WillAppearEvent } from './types/incoming-event';
import { OutgoingEvent } from './types/outgoing-event';

const GRID_WIDTH = 5;

export class Client extends EventEmitter {
  private args: Record<string, string> = {};
  private ws: WebSocket;
  private _buttons: Button[] = Array.from({ length: 15 }, () => null);

  constructor() {
    super();

    const rawArgs = process.argv.slice(2);
    for (let i = 0; i < rawArgs.length; i += 2) {
      this.args[rawArgs[i].slice(1)] = rawArgs[i + 1];
    }

    this.connect();
  }

  public connect(): void {
    console.log('connecting to', this.args.port);

    this.ws = new WebSocket(`ws://localhost:${this.args.port}`);
    this.ws.addEventListener('open', this.handleOpen.bind(this));
    this.ws.addEventListener('message', this.handleMessage.bind(this));
    this.ws.addEventListener('close', () => process.exit());
  }

  private sendRaw(payload: any): void {
    this.ws.send(JSON.stringify(payload));
  }

  public send<E extends OutgoingEvent['event']>(
    event: E,
    data: Omit<Extract<OutgoingEvent, { event: E }>, 'event'>,
  ): void {
    this.sendRaw({ event, ...data });
  }

  private handleOpen(): void {
    this.sendRaw({
      event: this.args.registerEvent,
      uuid: this.args.pluginUUID,
    });
  }

  private handleMessage(message: MessageEvent): unknown {
    const incomingEvent: IncomingEvent = JSON.parse(message.data.toString());
    console.log(message.data.toString());

    switch (incomingEvent.event) {
      case 'willAppear':
        return this.handleWillAppear(incomingEvent);

      case 'keyDown':
      case 'keyUp':
        return this.emit(
          incomingEvent.event,
          Button.fromEvent(this, incomingEvent),
        );
    }
  }

  private handleWillAppear(event: WillAppearEvent): void {
    const button = Button.fromEvent(this, event);
    this._buttons[button.index] = button;
  }

  public getButton(index: number): Button;
  public getButton(coordinates: { x: number; y: number }): Button;
  public getButton(argument: number | { x: number; y: number }): Button {
    if (typeof argument === 'number') {
      return this._buttons[argument];
    }

    return this._buttons[(argument.y * GRID_WIDTH) + argument.x];
  }

  public get buttons(): Button[] {
    return this._buttons.filter(Boolean);
  }

  public override on<E extends keyof ClientEvents>(
    eventName: E,
    callback: (...args: ClientEvents[E]) => any,
  ): this {
    return super.on(eventName, callback as (...args: unknown[]) => unknown);
  }
}
