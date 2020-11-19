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
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle='#f80';
  ctx.fillRect(0, 0, 512, 128);

  var actx = new AudioContext();
  var source = actx.createMediaElementSource(elem);

  var ana = actx.createAnalyser();
  ana.fftSize = 32;
  ana.minDecibels = -90;
  ana.maxDecibels = -10;
  source.connect(ana);

  ana.connect(actx.destination);

  const len = ana.frequencyBinCount;
  const buf = new Uint8Array(len);
  //const buf = new Float32Array(len);

  setInterval(() => {
    ana.getByteFrequencyData(buf);
    //ana.getFloatFrequencyData(buf);

    ctx.fillStyle='#ffc';
    ctx.fillRect(0, 0, 512, 128);

    ctx.fillStyle='#226';

    //??? calculate size
    const size = 32;

    for (let i = 0; i < buf.length; i++) {
      const val = buf[i];
      const x = size * i;
      const y = val / 2;

      ctx.fillRect(x, 0, size, y);
    }
    ctx.stroke();
  }, 10);
}
