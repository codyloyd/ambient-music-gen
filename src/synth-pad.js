import * as Tone from 'tone';

export function createSynthPad() {
  const filter = new Tone.AutoFilter({frequency: ".4hz", depth: 1}).toDestination();
  const reverb = new Tone.Freeverb({ dampening: 100, wet: 1, roomSize: .98 }).connect(filter);
  const chorus = new Tone.Chorus({ frequency: 150, delayTime: 13.5, depth: 10 }).connect(reverb);

  const synth = new Tone.PolySynth(Tone.AMSynth, {
    detune: 2,
    volume: -10,
    oscillator: {
      type: 'fattriangle',
      spread: 20,
      count: 4,
    },
    envelope: {
      attack: 2,
      decay: 0.6,
      sustain: 0.7,
      release: 8,
    },
  }).connect(chorus);

  return synth;
}

export function playSynthPad(synth, note, duration, time) {
  synth.triggerAttackRelease(note, duration, time);
}