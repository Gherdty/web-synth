"use client";

import TransportMenu from "./transport-menu";
import InstrumentNav from "./instrument-nav";
import { SequencerGrid } from "./components/grid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TransportMenu />
      <InstrumentNav />
      <SequencerGrid />
    </main>
  );
}
