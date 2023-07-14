import { atom } from 'jotai';

export const beatAtom = atom<number | null>(null);

export interface Instrument {
  name: string;
  selected: boolean;
  color: string;
  grid: {row: number, col: number}[];
}

const defaultSequence = {
  drums: [
    // HH
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
    { row: 1, col: 5 },
    { row: 1, col: 6 },
    { row: 1, col: 7 },
    { row: 1, col: 8 },
    { row: 1, col: 9 },
    { row: 1, col: 10 },
    { row: 1, col: 11 },
    { row: 1, col: 12 },
    { row: 1, col: 13 },
    { row: 1, col: 14 },
    { row: 1, col: 15 },
    // BD
    { row: 7, col: 0 },
    { row: 7, col: 7 },
    { row: 7, col: 10 },
    // Verb Rim
    { row: 5, col: 4 },
    { row: 5, col: 12 },
    // Rim
    { row: 2, col: 4 }, 
    // Snap
    { row: 4, col: 12 },
  ],
  bass: [
    { row: 0, col: 0 },
    { row: 7, col: 1 },
    { row: 7, col: 3 },
    { row: 7, col: 7 },
    { row: 5, col: 8 },
    { row: 5, col: 9 },
    { row: 5, col: 11 },
    { row: 4, col: 12 },
    { row: 4, col: 13 },
    { row: 7, col: 15 },
  ],
  chords: [
    { row: 5, col: 3 },
    { row: 0, col: 9 },
    { row: 4, col: 13 },
  ],
  lead: [
    { row: 7, col: 0 },
    { row: 3, col: 2 },
    { row: 5, col: 3 },
    { row: 3, col: 6 },
    { row: 1, col: 7 },
    { row: 3, col: 9 },
    { row: 1, col: 12 },
    { row: 0, col: 14 },
  ],
}

export const instrumentsAtom = atom<Instrument[]>([
  {
    name: "Drums",
    selected: true,
    color: "blue",
    grid: defaultSequence.drums
  },
  {
    name: "Bass",
    selected: false,
    color: "green",
    grid: defaultSequence.bass
  },
  {
    name: "Chords",
    selected: false,
    color: "yellow",
    grid: defaultSequence.chords
  },
  {
    name: "Lead",
    selected: false,
    color: "red",
    grid: defaultSequence.lead
  },
])