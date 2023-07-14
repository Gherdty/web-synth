"use client";

import { beatAtom } from "@/src/atoms";
import { instrumentsAtom } from "@/src";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { playInstruments } from "@/src/instruments/playInstruments";

const colors: Record<string, string> = {
  blue: "bg-blue-200",
  red: "bg-red-200",
  green: "bg-green-200",
  yellow: "bg-yellow-200",
};

export function SequencerGrid() {
  const [beat] = useAtom(beatAtom);
  const [instruments, setInstruments] = useAtom(instrumentsAtom);

  // Get the selected instrument
  const selectedInstrument = instruments.find((instrument) => {
    return instrument.selected;
  }) || instruments[0];

  const toggleSquare = (row: number, col: number) => {
    if (!selectedInstrument) return;
    const selectedSquares = selectedInstrument?.grid;

    const index = selectedInstrument?.grid.findIndex(
      (square) => square.row === row && square.col === col
    );
    const newSelectedSquares = [...selectedSquares];
    if (index === -1) {
      newSelectedSquares.push({ row, col });
    } else {
      newSelectedSquares.splice(index, 1);
    }

    setInstruments((prev) => {
      return prev.map((prevInstrument) => {
        if (prevInstrument.name === selectedInstrument.name) {
          return {
            ...prevInstrument,
            grid: newSelectedSquares,
          };
        } else {
          return prevInstrument;
        }
      });
    });
  };

  useEffect(() => {
    if (beat === null) return;
    playInstruments(instruments, beat);
  }, [beat]);

  return (
    <div className="grid grid-cols-16 gap-2">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 16 }).map((_, col) => {
          const isSelected = selectedInstrument?.grid.find(
            (square) => square.row === row && square.col === col
          );

          let bgColor = colors[selectedInstrument.color]

          if (isSelected && beat === col) {
            bgColor = "bg-red-200";
          } else if (isSelected) {
            bgColor = "bg-white";
          } else if (beat === col) {
            bgColor = "bg-red-500";
          }

          return (
            <button
              key={`${row}-${col}`}
              className={`h-12 w-12 hover:bg-gray-200 ${bgColor}`}
              onClick={() => toggleSquare(row, col)}
            />
          );
        })
      )}
    </div>
  );
}
