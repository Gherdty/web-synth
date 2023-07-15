import * as Tone from "tone";
import { beatAtom } from "../../../src/atoms";
import { useAtom, atom } from "jotai";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from "react";

const handleBeatAtom = atom(
  null,
  (get, set, update: number | null) => set(beatAtom, update)
)

export function Play() {
  const [, setBeat] = useAtom(handleBeatAtom);

  return (
    <button
      onClick={async () => {
        await Tone.start();
        Tone.Transport.start("+0.1");
        setBeat(0);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
    </button>
  );
}

export function Stop() {
  const [, setBeat] = useAtom(handleBeatAtom);

  return (
    <button
      onClick={() => {
        Tone.Transport.stop();
        setBeat(null);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
        />
      </svg>
    </button>
  );
}

interface ITapTempoState {
  tapTimes: number[];
  displayBpm: number;
  isMouseDown: boolean;
  lastMouseY: number;
}

export function Tempo() {
  // Initialize state for tap times, display BPM and mouse hold status
  const [state, setState] = useState<ITapTempoState>({
    tapTimes: [0, 0, 0, 0, 0],
    displayBpm: 140,
    isMouseDown: false,
    lastMouseY: 0,
  });

  const bpmInputRef = useRef<HTMLInputElement>(null);

  const handleTap = async () => {
    // If the transport is not running, start it. This is so we can set the BPM
    // before playing the notes/beats.
    if (Tone.Transport.state !== "started") {
      await Tone.start();
      Tone.Transport.start();
    }
    // Get the current time
    const now = Tone.context.currentTime;

    // Shift the array to remove the oldest tap and add the newest one
    const newTapTimes = [...state.tapTimes.slice(1), now];

    setState((prev) => {
      return {
        ...prev,
        tapTimes: newTapTimes,
      };
    });

    // Calculate the average interval
    const intervals = newTapTimes.slice(1).map((t, i) => t - newTapTimes[i]);
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

    // Convert to BPM and set the Tone.Transport tempo
    const bpm = 60 / avgInterval;
    if (!isNaN(bpm) && isFinite(bpm)) {
      Tone.Transport.bpm.value = bpm;
      setState((prev) => {
        return {
          ...prev,
          displayBpm: Math.round(bpm),
        };
      });
    }
  };

  const handleBpmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 2 && bpmInputRef.current) {
      bpmInputRef.current.focus();
    }
  };

  const handleBpmMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    setState((prev) => {
      return {
        ...prev,
        lastMouseY: e.clientY,
        isMouseDown: true,
      };
    });
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!state.isMouseDown) return;
    const diffY = state.lastMouseY - e.clientY;
    setState((prev) => {
      return {
        ...prev,
        displayBpm: Math.max(prev.displayBpm + diffY, 0),
        lastMouseY: e.clientY,
      };
    });
  };

  const handleMouseUp = () => {
    setState((prev) => {
      return {
        ...prev,
        isMouseDown: false,
      };
    });
  };

  const handleBpmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const bpm = Math.max(Number(e.target.value), 0);
    setState((prev) => {
      return {
        ...prev,
        displayBpm: bpm,
      };
    });
    Tone.Transport.bpm.value = bpm;
  };

  // Add event listeners to window for mouse move and mouse up
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as EventListener);
    window.addEventListener("mouseup", handleMouseUp as EventListener);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
      window.removeEventListener("mouseup", handleMouseUp as EventListener);
    };
  }, [state.isMouseDown, state.lastMouseY]);

  // Update the Tone.Transport tempo when displayBpm changes
  useEffect(() => {
    Tone.Transport.bpm.value = state.displayBpm;
  }, [state.displayBpm]);

  return (
    <div className="flex">
      <button className="w-10" onClick={handleTap}>
        Tap
      </button>
      <div className="cursor-default">|</div>
      <div className="relative w-14">
        <button
          onMouseDown={handleBpmMouseDown}
          onClick={handleBpmClick}
          className="absolute inset-0 bg-transparent"
        />
        <input
          ref={bpmInputRef}
          type="text"
          value={state.displayBpm}
          className="absolute inset-0 text-center bg-transparent pointer-events-none overscroll-none"
          onChange={handleBpmChange}
          onBlur={() => bpmInputRef.current && bpmInputRef.current.blur()}
        />
      </div>
    </div>
  );
}
