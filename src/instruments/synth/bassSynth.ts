import * as Tone from 'tone';

const scale = ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3"];

export function bassSynth(note: number, duration: string) {
  const synth = new Tone.MonoSynth({
    oscillator: {
      type: "square"
    },
  }).toDestination();
  synth.volume.value = -10;
  synth.triggerAttackRelease(scale[note], duration);
}