import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

import Input from './Input.js';

const html = htm.bind(h);

function App() {
  return html`
    <main>
      <${Input}><//>
    </main>
    <section>
      OTHER
    </section>
  `;
}

export default App;
