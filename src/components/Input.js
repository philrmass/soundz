import { h } from '../../node_modules/preact/dist/preact.module.js';
import htm from '../../node_modules/htm/dist/htm.module.js';

import { setAudio } from '../utilities/sources.js';

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
        <button
          class='input-button'
          onClick=${() => setAudio('video')}
        >
          Video
        </button>
      </div>
      <div>
        <audio id='audio' controls />
      </div>
      <div>
        <video id='video' width='500px' height='500px' loop controls />
      </div>
    </section>
  `;
}

export default Input;
