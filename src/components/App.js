import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

import Input from './Input.js';

const html = htm.bind(h);

function App() {
  return html`
    <main class='main'>
      <${Input}><//>
      <section class='visual'>
        <canvas id='canvas' />
      </section>
    </main>
  `;
}

export default App;
