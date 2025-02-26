# streamdeck

https://github.com/user-attachments/assets/cbf04114-87e2-44f3-9c8a-a904834bb44e

```ts
const createCircle = (color: string, text: string = ''): JSX.Element => (
  <svg height={100} width={100}>
    <circle cx={50} cy={50} r={40} fill={color} />
    <text x="50%" y="67%" textAnchor="middle" fontSize={50}>
      {text}
    </text>
  </svg>
);

let startedAt: number;
let buttons: Array<{ button: Button; index: number }>;

client.on('keyDown', (button) => {
  startedAt ??= Date.now();

  if (buttons.length === 0 && button.coordinates.x === 2 && button.coordinates.y === 1) {
    button.setTitle('');
    return main();
  }

  if (button.index !== buttons[0].button.index) {
    const { index } = buttons.find(b => b.button.index === button.index);
    return button.setImage(createCircle('red', index.toString()));
  }

  if (buttons.shift().index !== client.buttons.length) {
    return button.setImage(createCircle('green'));
  }

  onFinish();
});

function main(): void {
  startedAt = null;
  buttons = [ ...client.buttons ]
    .sort(() => Math.random() - 0.5)
    .map((button, index) => ({ button, index: index + 1 }));

  for (const { index, button } of buttons) {
    button.setImage(createCircle('white', index.toString()));
  }
}

function onFinish(): void {
  for (const button of client.buttons) {
    button.setImage(<svg height={100} width={100} />);
  }

  const duration = Date.now() - startedAt;
  client.getButton({ x: 2, y: 1 }).setTitle(`${(duration / 1000).toFixed(2)}s`);
}
```


