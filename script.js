'use strict';

const video = document.querySelector('#flock-video');
const modelButtons = document.querySelectorAll('[data-model]');
const modelCaption = document.querySelector('#model-caption');

modelButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const model = button.dataset.model;
    const wasPlaying = !video.paused;
    video.pause();
    video.src = `murmuration-${model}.mp4`;
    video.removeAttribute('poster');
    const label = model === 'research' ? 'Research flight' : 'Original model';
    video.setAttribute('aria-label', `Recorded trajectories of the Murmuration ${label.toLowerCase()} simulation`);
    video.load();
    if (wasPlaying) video.play().catch(() => {});
    modelCaption.textContent = `${label} · 40-second recorded simulation`;
    modelButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
  });
});

const galleryButtons = document.querySelectorAll('[data-view]');
const snowImage = document.querySelector('#snow-image');
const viewDescriptions = {
  'on-table': 'Snowglobe resting on a wooden table in a warm Christmas room, with flakes suspended over a snowy bridge',
  'picked-up': 'Snowglobe lifted from the table with independently moving snow inside the glass',
  'turned': 'Snowglobe rotated in the stationary room, showing how the miniature and snow respond to turning'
};

galleryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;
    snowImage.src = `snowglobe-${view}.jpg`;
    snowImage.alt = viewDescriptions[view];
    galleryButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
  });
});
