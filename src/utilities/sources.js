export function setAudio(id) {
  const elem = document.getElementById(id);
  elem.onplay = () => visual(elem);

  const input = document.createElement('input');
  input.type = 'file';

  input.onchange = () => {
    const file = input.files[0];
    const url = URL.createObjectURL(file);

    elem.src = url; 
    elem.play();
  };

  input.click();
}

function visual(elem) {
  const width = 2048;
  const height = 256;

  const canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  var actx = new AudioContext();
  var source = actx.createMediaElementSource(elem);

  var ana = actx.createAnalyser();
  ana.fftSize = 2048;
  ana.minDecibels = -130;
  ana.maxDecibels = -10;
  source.connect(ana);

  ana.connect(actx.destination);

  const len = ana.frequencyBinCount;
  const buf = new Uint8Array(len);
  const max = 256;

  setInterval(() => {
    ana.getByteFrequencyData(buf);
    drawGraph(ctx, buf, max, width, height);
  }, 20);
}

//??? adjust by size and data
//??? improve colors
//??? animation frame
function drawGraph(ctx, buf, max, width, height) {
  const sizeX = width / buf.length;
  const sizeY = height / max;

  ctx.fillStyle='#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle='#444';

  for (let i = 0; i < buf.length; i++) {
    const val = buf[i];
    const x = sizeX * i;
    const y = sizeY * val;

    ctx.fillRect(x, height - y, sizeX, y);
  }
}
