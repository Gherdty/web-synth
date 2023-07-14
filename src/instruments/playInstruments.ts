import { Instrument } from "../atoms";
import { basicDrumKit, basicSynth, bassSynth, chordSynth } from ".";

const selectedSquares = (instrument: Instrument, beat: number) => {
  return instrument.grid.filter((square) => {
    if (square.col === beat) return true;
  }).map((square) => {
    // We invert the row because the grid is drawn from the top down
    // and we want the bottom left to be 0,0 from a scale perspective
    const invertedRow = 7 - square.row;
    return invertedRow;
  })
};

export const playInstruments = (instruments: Instrument[], beat: number) => {

  // Drum Kit
  const drumNotes = selectedSquares(instruments[0], beat);
  basicDrumKit(drumNotes);

  // Bass
  const bassNotes = selectedSquares(instruments[1], beat);
  // TODO Restrict to one note at a time
  if (bassNotes.length > 0) bassSynth(bassNotes[0], "16n");

  // Chord Synth
  const chordNotes = selectedSquares(instruments[2], beat);
  if (chordNotes.length > 0) chordSynth(chordNotes[0], "16n");

  // Lead Synth
  const leadNotes = selectedSquares(instruments[3], beat);
  if (leadNotes.length > 0) basicSynth(leadNotes[0], "16n");
};