export function setAudio(id) {
  const width = 2048;
  const height = 256;

  const elem = document.getElementById(id);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  elem.onplay = () => visual0(ctx, width, height, elem);

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

function visual0(ctx, width, height, elem) {
  var actx = new AudioContext();
  var source = actx.createMediaElementSource(elem);

  var ana = actx.createAnalyser();
  ana.fftSize = 2048;
  ana.minDecibels = -100;
  ana.maxDecibels = -30;
  source.connect(ana);

  ana.connect(actx.destination);

  const len = ana.frequencyBinCount;
  const buf = new Uint8Array(len);
  const buf1 = new Float32Array(len);
  const max = 256;

  setInterval(() => {
    ana.getByteFrequencyData(buf);
    ana.getFloatFrequencyData(buf1);
    drawGraph0(ctx, buf, max, width, height);
    //drawGraph1(ctx, buf1, max, width, height);
  }, 20);
}

//??? adjust by size and data
//??? improve colors
//??? animation frame
function drawGraph0(ctx, buf, max, width, height) {
  const sizeX = width / buf.length;
  const sizeY = height / max;

  ctx.fillStyle='#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle='#44f';

  for (let i = 0; i < buf.length; i++) {
    const val = buf[i];
    const x = sizeX * i;
    const y = sizeY * val;

    ctx.fillRect(x, height - y, sizeX, y);
  }
}

function drawGraph1(ctx, buf1, max, width, height) {
  //console.log('G1', buf1);
  const sizeX = width / buf1.length;
  const sizeY = height / max;

  //ctx.fillStyle='#fff';
  //ctx.fillRect(0, 0, width, height);
  ctx.fillStyle='#f44';

  for (let i = 0; i < buf1.length; i++) {
    const range = Math.min(-20, Math.max(-110, buf1[i]));
    const val = 256 * ((range - (-20)) / 90);
    const x = sizeX * i;
    const y = sizeY * val;

    ctx.fillRect(x, height - y, sizeX, y);
  }
}
