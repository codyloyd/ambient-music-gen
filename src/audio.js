import * as Tone from 'tone';
import { createSynthPad, playSynthPad } from './synth-pad.js';
import { createSynthPluck, playSynthPluck} from './synth-pluck.js';
import { triggerVisualEvent } from './visual.js';

let synth;
let pluck
let pluckPaused = true;
const CBass = ['C2', 'E2']
const CChords = ['C3', 'E3', 'G3', 'A3'];
const CChordsHigh = ['D4', 'E4', 'B4', 'A4'];
const CNotes = ['C6', 'D6', 'E6', 'A6', 'B6', 'C7', 'D7', 'E7'];

const AmBass = ['A2']
const AmChords = ['A3', 'C4', 'E4', 'A4'];
const AmChordsHigh = ['B4', 'C5', 'F5', 'A5'];
const AmNotes = ['A6', 'B6', 'C7', 'E7', 'F7', 'G7'];

const DmBass = ['D2', 'F2']
const DmChords = ['D3', 'F3', 'A3'];
const DmChordsHigh = ['E4', 'F4', 'D5'];
const DmNotes = ['D6', 'E6', 'F7', 'A7', 'B7', 'C8'];


let padChords = CChords;
let padChordsHigh = CChordsHigh;
let padBass = CBass;
let pluckNotes = CNotes;
let chordChange = 0;
let chordCount = 0;

export function initAudio() {
    synth = createSynthPad();
    pluck = createSynthPluck()
    Tone.Transport.bpm.value = 40; // Set the BPM
    Tone.Transport.start();

    Tone.Transport.scheduleRepeat((time) => {
      //handle chord changes
      if (chordCount % 8 === 0) {
        console.log(chordCount)
        chordChange++;
        if (chordChange % 2 === 0) {
          console.log('Am');
          padChords = AmChords;
          padChordsHigh = AmChordsHigh;
          padBass = AmBass;
          pluckNotes = AmNotes;
        } else {
          console.log('C');
          padChords = CChords;
          padChordsHigh = CChordsHigh;
          padBass = CBass;
          pluckNotes = CNotes;
        }

        if (chordChange % 6 === 0) {
          console.log('Dm');
          padChords = DmChords;
          padChordsHigh = DmChordsHigh;
          padBass = DmBass;
          pluckNotes = DmNotes;
        }
      }

      const note = padChords[Math.floor(Math.random() * padChords.length)];
      playSynthPad(synth, note, '2m', time);

      const otherNote = padChordsHigh[Math.floor(Math.random() * padChordsHigh.length)];
      playSynthPad(synth, otherNote, '2m', time);
      

      const probability = time < 200 ? .3 : time < 500 ? .5 : .8;
      if (time > 10 && Math.random() < probability) {
        const bassNote = padBass[Math.floor(Math.random() * padBass.length)];
        playSynthPad(synth, bassNote, '2m', time);
      }
      if (time > 30 && pluckPaused) {
        beginPluck();
      }
      chordCount++;
    }, '2m'); // Play a note every quarter note
}

function beginPluck() {
  pluckPaused = false;
  Tone.Transport.scheduleRepeat((time) => {
    const probability = time < 100 ? 0.1 : 0.3; // 50% chance to play a note
    const shouldPlayNote = Math.random() < probability; // 50% chance to play a note
    if (!shouldPlayNote) return; // Skip this iteration if not playing a note
    const note = pluckNotes[Math.floor(Math.random() * pluckNotes.length)];
    playSynthPluck(pluck, note, '4n', time);
    triggerVisualEvent();
  }, '4n'); // Play a note every quarter note
}