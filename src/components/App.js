import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

const html = htm.bind(h);

function App() {
  return html`
    <h2>
      APP
    </h2>
  `;
}

export default App;
