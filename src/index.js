
function onLoad() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  video.addEventListener('play', () => {
    var actx = new AudioContext();
    var source = actx.createMediaElementSource(video);

    //var node = actx.createGain();
    var node = actx.createBiquadFilter();
    node.type = 'lowpass';
    //node.type = 'highpass';
    //node.frequency.value = 400;
    node.frequency.value = 24000;
    //node.frequency.value = 6000;
    source.connect(node);

    var ana = actx.createAnalyser();
    ana.fftSize = 2048;
    ana.minDecibels = -90;
    ana.maxDecibels = -10;

    const len = ana.frequencyBinCount;
    //const buf = new Uint8Array(len);
    const buf = new Float32Array(len);
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

  const file = document.getElementById('file');
  file.onchange = function() {
    var files = this.files;
    var file = URL.createObjectURL(files[0]); 
    video.src = file; 
    video.play();
  };
}

document.addEventListener("DOMContentLoaded", onLoad);

