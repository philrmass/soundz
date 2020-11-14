import { h, render } from '/node_modules/preact/dist/preact.module.js';
import htm from '/node_modules/htm/dist/htm.module.js';

const html = htm.bind(h);

console.log('Soundz');

const appName = 'Preact';
render(html`<h1>Rendered by ${appName}</h1>`, document.body);
