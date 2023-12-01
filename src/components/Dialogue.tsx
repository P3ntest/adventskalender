import { ComponentProps, useEffect, useState } from "react";
import huskyImg from "../assets/husky.png";
import { TypeAnimation } from "react-type-animation";

export function Dialogue({
  dialogue,
}: {
  dialogue: {
    text: string;
    key?: string;
    options: {
      text: string;
      next?: string;
      callback?: () => void;
      movesAway?: boolean;
    }[];
  }[];
}) {
  const [state, setState] = useState<string | number>(0);

  const currentDialogue =
    typeof state === "number"
      ? dialogue[state]
      : dialogue.find((d) => d.key === state)!;

  return (
    <div className="w-screen h-screen fixed z-50">
      <img
        src={huskyImg}
        alt=""
        className="absolute bottom-0 left-0"
        style={{
          width: "40vw",
        }}
      />
      <div
        className="absolute bottom-0 right-0 px-28 py-10 flex flex-col items-stretch gap-2"
        style={{
          left: "25vw",
        }}
      >
        <div className="bg-white rounded-xl p-4 shadow-lg w-full h-64">
          <div className="text-2xl font-bold">
            <TypeAnimation
              sequence={[currentDialogue.text]}
              cursor={false}
              key={currentDialogue.key}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-start gap-2">
          {currentDialogue.options.map((option) => (
            <Option option={option} key={option.text} setState={setState} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Option({
  option,
  setState,
}: {
  option: ComponentProps<typeof Dialogue>["dialogue"][0]["options"][0];
  setState: (next: string) => void;
}) {
  const [currentPosition, setCurrentPosition] = useState([0, 0]);

  return (
    <button
      className="bg-white rounded-xl p-4 shadow-lg text-2xl hover:scale-110 transition-all relative"
      style={{
        transform:
          option.movesAway &&
          `translate(${currentPosition[0]}px, ${currentPosition[1]}px)`,
      }}
      onMouseEnter={() => {
        if (option.movesAway) {
          setCurrentPosition((c) => [
            c[0] + Math.random() * 500 - 250,
            c[1] - 100,
          ]);
        }
      }}
      onClick={() => {
        if (option.movesAway) return;
        if (option.callback) {
          option.callback();
        }
        if (option.next) {
          setState(option.next);
        }
      }}
    >
      {option.text}
    </button>
  );
}
