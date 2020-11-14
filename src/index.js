import { h, render } from '../node_modules/preact/dist/preact.module.js';
import htm from '../node_modules/htm/dist/htm.module.js';

import App from './components/App.js';

const html = htm.bind(h);

const version = '0.1.0';
console.log(`SOUNDZ ${version}`);

const appName = 'Preact';
render(html`<div><${App}></div>`, document.body);
