import { useAtom } from "jotai";
import { instrumentsAtom } from "@/src";

export default function InstrumentNav() {
  const [instruments, setInstruments] = useAtom(instrumentsAtom);

  return (
    <ul className="flex">
      {instruments.map((instrument, index) => {
        const backgroundColor = instrument.selected ? "#d3d3d3" : "black";
        return (
          <li className="-mb-px mr-1" key={index}>
            <button
              className={`inline-block border rounded py-2 px-4 font-semibold`}
              style={{
                background: backgroundColor,
                color: instrument.color,
              }}
              onClick={() =>
                setInstruments((prev) => {
                  return prev.map((prevInstrument, prevIndex) => {
                    if (prevIndex === index) {
                      return {
                        ...prevInstrument,
                        selected: true,
                      };
                    } else {
                      return {
                        ...prevInstrument,
                        selected: false,
                      };
                    }
                  });
                })
              }
            >
              {instrument.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
