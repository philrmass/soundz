import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

const html = htm.bind(h);

function Input() {
  return html`
    <section>
      INPUT
    </section>
  `;
}

export default Input;
