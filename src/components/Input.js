import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

import { setAudio } from '../sources.js';

const html = htm.bind(h);

function Input() {
  return html`
    <section class='input'>
      <div class='input-controls'>
        <button class='input-controls-button'>
          X
        </button>
      </div>
      <div class='input-content'>
        <button class='input-button'>
          Mic
        </button>
        <button
          class='input-button'
          onClick=${() => setAudio('audio')}
        >
          Audio
        </button>
        <button class='input-button'>
          Video
        </button>
        <audio id='audio' />
      </div>
    </section>
  `;
}

export default Input;
