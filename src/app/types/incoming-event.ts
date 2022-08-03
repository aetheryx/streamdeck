interface Base<E extends string, P> {
  event: E;
  action: string;
  context: string;
  device: string;
  payload: P;
}

type Coordinates = {
  column: number;
  row: number;
};

export type WillAppearEvent = Base<'willAppear', {
  coordinates: Coordinates;
}>;

export type KeyEvent = Base<'keyUp' | 'keyDown', {
  coordinates: Coordinates;
}>;

export type IncomingEvent =
  | WillAppearEvent
  | KeyEvent;
