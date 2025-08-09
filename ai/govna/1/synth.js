export function startAudio(onFrame) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  const data = new Uint8Array(analyser.frequencyBinCount);

  // Основной генератор
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, ctx.currentTime); // A3

  // Модуляция
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 4; // низкочастотная модуляция
  lfoGain.gain.value = 30;
  lfo.connect(lfoGain).connect(osc.frequency);

  // Эффекты
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;

  const gain = ctx.createGain();
  gain.gain.value = 0.4;

  osc.connect(filter).connect(analyser).connect(gain).connect(ctx.destination);
  lfo.start();
  osc.start();

  // Анимация + ритм
  function animate() {
    analyser.getByteFrequencyData(data);
    onFrame(data);
    requestAnimationFrame(animate);
  }
  animate();
}
