import * as Tone from 'tone';

const scale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

export function basicSynth (note: number, duration: string) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(scale[note], duration);
}