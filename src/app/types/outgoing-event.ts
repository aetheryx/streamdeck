interface Base<E extends string, P> {
  event: E;
  context: string;
  payload: P;
}

export type Target = 'software' | 'hardware' | 'both';

type SetImageEvent = Base<'setImage', {
  image: string;
  target: Target;
  state: number;
}>;

type SetTitleEvent = Base<'setTitle', {
  title: string;
  target: Target;
  state: number;
}>;

export type OutgoingEvent =
  | SetImageEvent
  | SetTitleEvent;
