import * as Tone from 'tone';

const scale = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];

export function chordSynth(note: number, duration: string) {
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine"
    },
  }).toDestination();
  synth.volume.value = -10;
  synth.triggerAttackRelease(
    [
      scale[note], scale[note + 2], scale[note + 2]
    ],
    duration);
}