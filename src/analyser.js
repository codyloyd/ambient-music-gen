import * as Tone from 'tone';
import * as THREE from 'three';

let analyser, frequencyData, waveformData;
const downsampleSize = 128

export function initAudioAnalysis() {
  analyser = new Tone.Analyser('fft', 1024);
  Tone.getDestination().connect(analyser); // Connect the output to the analyser
  frequencyData = analyser.getValue();
  waveformData = analyser.getValue('waveform');
}

export function getFrequencyData() {
  if (analyser) {
    frequencyData = analyser.getValue();
    return downsampleArray(frequencyData, downsampleSize);
  }
  return null;
}

export function getWaveformData() {
  if (analyser) {
    waveformData = analyser.getValue('waveform');
    return downsampleArray(waveformData, downsampleSize);
  }
  return null;
}

function downsampleArray(array, size) {
  const downsampled = new Float32Array(size);
  const step = Math.floor(array.length / size);
  for (let i = 0; i < size; i++) {
    downsampled[i] = array[i * step];
  }
  return downsampled;
}