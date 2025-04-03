import * as Tone from 'tone';
import { initVisual } from './visual.js';
import { initAudioAnalysis } from './analyser.js';

let audioStarted = false;

function startAudio() {
  if (audioStarted) return;
  import('./audio.js').then((module) => {
    module.initAudio();
    audioStarted = true;
  });

  document.querySelector('h1').style.opacity = '0';
  document.querySelector('canvas').style.opacity = '1';
}

document.addEventListener('click', startAudio);
document.addEventListener('keydown', startAudio);

document.addEventListener('DOMContentLoaded', () => {
  initVisual();
  initAudioAnalysis();
});