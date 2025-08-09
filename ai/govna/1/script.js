import { startAudio } from './synth.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;
let particles = [];

class Particle {
  constructor(x, y, freq) {
    this.x = x;
    this.y = y;
    this.freq = freq;
    this.r = 2 + Math.random() * 3;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.5 + Math.random() * 2;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.r *= 0.97;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.freq * 360}, 100%, 50%)`;
    ctx.fill();
  }
}

function renderFrame(audioData) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  audioData.forEach((amp, i) => {
    if (Math.random() < 0.01) {
      const freq = i / audioData.length;
      particles.push(new Particle(canvas.width / 2, canvas.height / 2, freq));
    }
  });

  particles = particles.filter(p => p.r > 0.5);
  for (let p of particles) {
    p.update();
    p.draw();
  }
}

startAudio(renderFrame);

document.getElementById('download').onclick = async () => {
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ritual.mp4';
    a.click();
  };

  recorder.start();
  setTimeout(() => recorder.stop(), 10000); // 10 секунд
};
