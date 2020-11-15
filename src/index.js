import { render } from '../node_modules/preact/dist/preact.module.js';

import App from './components/App.js';

const version = '0.1.0';
console.log(`SOUNDZ ${version}`);

render(App(), document.body);
