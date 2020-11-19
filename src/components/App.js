import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

import Input from './Input.js';

const html = htm.bind(h);

function App() {
  return html`
    <main class='main'>
      <${Input}><//>
      <section class='display'>
        <canvas width='256' height='128' id='canvas' />
      </section>
    </main>
  `;
}

export default App;
