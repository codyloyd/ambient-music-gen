import * as Tone from 'tone';

export function createSynthPluck() {
  const reverb = new Tone.Freeverb({ dampening: 300, wet: 1, roomSize: .95}).toDestination()
  const delay = new Tone.PingPongDelay({
    delayTime: '1n.',
    feedback: 0.5,
    wet: 0.5,
  }).connect(reverb);

  const synth = new Tone.PolySynth(Tone.AMSynth, {
    detune: 8,
    volume: -15,
    oscillator: {
      type: 'triangle',
      spread: 20,
      count: 4,
    },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.01,
      release: 4,
    },
  }).connect(delay);

  return synth;
}

export function playSynthPluck(synth, note, duration, time) {
  synth.triggerAttackRelease(note, duration, time);
}