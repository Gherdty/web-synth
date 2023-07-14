import { Play, Stop, Tempo } from "./components/buttons/transport";

export default function TransportMenu() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black-500 border-white p-6">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <ul className="flex">
          <span className="font-semibold text-xl tracking-tight mr-4">
            Web Synth v0.1
          </span>
          <li className="mr-1 h-7 border">
            <Play />
          </li>
          <li className="mr-1 h-7 border">
            <Stop />
          </li>
          <li className="mr-1 h-7 border">
            <Tempo />
          </li>
        </ul>
      </div>
    </nav>
  );
}
