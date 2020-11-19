export function setAudio(id) {
  const elem = document.getElementById(id);
  elem.onplay = () => visual(elem);

  const input = document.createElement('input');
  input.type = 'file';

  //??? change to async
  input.onchange = () => {
    const file = input.files[0];
    const url = URL.createObjectURL(file);

    console.log('start audio');
    elem.src = url; 
    elem.play();
  };

  input.click();
}

function visual(elem) {
  console.log(' visual');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle='#f80';
  ctx.fillRect(0, 0, 512, 128);

  var actx = new AudioContext();
  var source = actx.createMediaElementSource(elem);

  /*
  var node = actx.createBiquadFilter();
  node.type = 'lowpass';
  node.frequency.value = 24000;
  source.connect(node);
  */

  var ana = actx.createAnalyser();
  ana.fftSize = 32; //1024; //2048
  ana.minDecibels = -90;
  ana.maxDecibels = -10;
  //node.connect(ana);
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

/*
function onLoad() {
  video.addEventListener('play', () => {

    setInterval(() => {
      ana.getFloatFrequencyData(buf);
      ctx.fillStyle='#000';
      ctx.fillRect(0, 0, 1024, 100);
      ctx.stroke();
      const min = -200;
      const max = -40;
      const range = max - min;
      const size = 100;
      const vals = buf.map((val) => size * ((val - min) / range));
      ctx.strokeStyle = '#ff0';
      ctx.lineWidth = 1;

      const so = vals.map((val, i) => {
        ctx.moveTo(i, size);
        ctx.lineTo(i, size - val);
      });
      ctx.stroke();
      //const min = buf.reduce((min, val) => val < min ? val : min, 1000);
      //const max = buf.reduce((min, val) => val > min ? val : min, -1000);
      //ana.getByteFrequencyData(buf);
      //console.log('BUF', buf);
      //console.log('mx', min, max);
    }, 1000);
    node.connect(ana);

    ana.connect(actx.destination)
  });


  render(html`<${App} name="Worldz" />`, document.body);
}
*/
