/* global JSZip, saveAs */
const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const form = document.getElementById('regionForm');
const list = document.getElementById('regionList');
const dlBtn = document.getElementById('downloadBtn');

const PIXEL_SIZE = 32;               // 1 логический пиксель = 32 экранных px
let img = null;
let regions = [];
let startX, startY, endX, endY, drawing = false;
let editingIndex = null;
let mode = 'px';                     // 'px' | '%'

// === Переключатель px / % ===
const modeSelect = document.createElement('select');
modeSelect.innerHTML = '<option value="px">Пиксели</option><option value="%">Проценты</option>';
form.insertBefore(modeSelect, form.firstChild);

upload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  img = new Image();
  img.onload = () => {
    const w = img.width;
    const h = img.height;
    canvas.width = w * PIXEL_SIZE;
    canvas.height = h * PIXEL_SIZE;
    canvas.style.width = `${w * PIXEL_SIZE}px`;
    canvas.style.height = `${h * PIXEL_SIZE}px`;
    canvas.style.imageRendering = 'pixelated';
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, w * PIXEL_SIZE, h * PIXEL_SIZE);
    renderRegions();
  };
  img.src = url;
});

/* === Выделение === */
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / PIXEL_SIZE,
    y: (e.clientY - rect.top) / PIXEL_SIZE
  };
}

canvas.addEventListener('mousedown', e => {
  if (!img) return;
  const { x, y } = getPos(e);
  startX = x;
  startY = y;
  drawing = true;
});

canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  const { x, y } = getPos(e);
  endX = x;
  endY = y;
  renderRegions();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  editingIndex = null;
  document.getElementById('texName').value = '';
  form.style.display = 'inline-block';
});

/* === Отрисовка === */
function renderRegions() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width * PIXEL_SIZE, img.height * PIXEL_SIZE);

  regions.forEach((r, i) => {
    const [x, y, w, h] = normalizeRegion(r);
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 1 * PIXEL_SIZE;
    ctx.strokeRect(x * PIXEL_SIZE, y * PIXEL_SIZE, w * PIXEL_SIZE, h * PIXEL_SIZE);

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5 * PIXEL_SIZE;
    ctx.font = `${10 * PIXEL_SIZE}px monospace`;
    ctx.fillText(r.name, (x + 0.2) * PIXEL_SIZE, (y + 1) * PIXEL_SIZE);
    ctx.strokeText(r.name, (x + 0.2) * PIXEL_SIZE, (y + 1) * PIXEL_SIZE);
  });

  if (drawing) {
    const [x, y, w, h] = [
      Math.min(startX, endX),
      Math.min(startY, endY),
      Math.abs(endX - startX),
      Math.abs(endY - startY)
    ];
    ctx.strokeStyle = '#f0f';
    ctx.lineWidth = 1 * PIXEL_SIZE;
    ctx.strokeRect(x * PIXEL_SIZE, y * PIXEL_SIZE, w * PIXEL_SIZE, h * PIXEL_SIZE);
  }
}

function normalizeRegion(r) {
  return [r.x, r.y, r.w, r.h]; // всё храним в логических пикселях
}

/* === Добавление / редактирование === */
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('texName').value.trim();
  if (!name) return;

  const [x, y, w, h] = [
    Math.min(startX, endX),
    Math.min(startY, endY),
    Math.abs(endX - startX),
    Math.abs(endY - startY)
  ];

  const region = mode === '%'
    ? { name, x: x / img.width, y: y / img.height, w: w / img.width, h: h / img.height }
    : { name, x, y, w, h };

  if (editingIndex !== null) {
    regions[editingIndex] = region;
    editingIndex = null;
  } else {
    regions.push(region);
  }

  renderRegions();
  renderList();
  form.reset();
  form.style.display = 'none';
});

/* === Список и редактирование === */
function renderList() {
  list.innerHTML = '';
  regions.forEach((r, i) => {
    const [x, y, w, h] = mode === '%'
      ? [r.x * 100, r.y * 100, r.w * 100, r.h * 100]
      : [r.x, r.y, r.w, r.h];
    const unit = mode === '%' ? '%' : 'px';
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${r.name}</strong> (${Math.round(w)}${unit} × ${Math.round(h)}${unit})
      <button onclick="editRegion(${i})">✏️</button>
      <button onclick="deleteRegion(${i})">×</button>
    `;
    list.appendChild(li);
  });
  dlBtn.disabled = regions.length === 0;
}

window.editRegion = i => {
  const r = regions[i];
  document.getElementById('texName').value = r.name;
  modeSelect.value = mode;
  startX = mode === '%' ? r.x * img.width : r.x;
  startY = mode === '%' ? r.y * img.height : r.y;
  endX = startX + (mode === '%' ? r.w * img.width : r.w);
  endY = startY + (mode === '%' ? r.h * img.height : r.h);
  editingIndex = i;
  form.style.display = 'inline-block';
};

window.deleteRegion = i => {
  regions.splice(i, 1);
  renderRegions();
  renderList();
};

/* === Скачивание ZIP === */
dlBtn.addEventListener('click', async () => {
  const zip = new JSZip();
  const folder = zip.folder('textures');

  for (const r of regions) {
    const [x, y, w, h] = mode === '%'
      ? [r.x * img.width, r.y * img.height, r.w * img.width, r.h * img.height]
      : [r.x, r.y, r.w, r.h];

    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const octx = off.getContext('2d');
    octx.imageSmoothingEnabled = false;
    octx.drawImage(img, x, y, w, h, 0, 0, w, h);

    const blob = await new Promise(res => off.toBlob(res));
    folder.file(`${r.name}.png`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'textures.zip');
});