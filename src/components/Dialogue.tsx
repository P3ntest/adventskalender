import { ComponentProps, useEffect, useState } from "react";
import huskyImg from "../assets/husky.png";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import { useSpring, animated } from "@react-spring/web";

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
  const huskySprings = useSpring({
    from: { y: -200, x: -200 },
    to: { y: 0, x: 0 },
    config: {
      tension: 30,
      friction: 0,
      duration: 300,
      damping: 0.4,
    },
  });

  const [state, setState] = useState<string | number>(0);

  const currentDialogue =
    typeof state === "number"
      ? dialogue[state]
      : dialogue.find((d) => d.key === state)!;

  const [doneTyping, setDoneTyping] = useState(false);
  useEffect(() => {
    setDoneTyping(false);
  }, [currentDialogue.text]);

  const [initialStartTyping, setInitialStartTyping] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInitialStartTyping(true);
    }, 1000);
  }, []);

  return (
    <div className="w-screen h-screen fixed z-40">
      <animated.img
        src={huskyImg}
        alt=""
        className="absolute"
        style={{
          width: "40vw",
          bottom: huskySprings.y.to((y) => `${y}px`),
          left: huskySprings.x.to((x) => `${x}px`),
        }}
      />
      <div
        className="absolute bottom-0 right-0 px-28 py-10 flex flex-col items-stretch gap-2"
        style={{
          left: "25vw",
        }}
      >
        <animated.div
          className="bg-white rounded-xl p-4 shadow-lg w-full h-64"
          style={{
            transform: huskySprings.y.to((y) => `translateY(${-y}px)`),
          }}
        >
          <div className="text-2xl font-bold">
            {initialStartTyping && (
              <TypeAnimation
                sequence={[currentDialogue.text, () => setDoneTyping(true)]}
                cursor={false}
                key={currentDialogue.key}
                speed={60}
              />
            )}
          </div>
        </animated.div>
        <div className="w-full flex flex-row justify-start gap-2">
          {currentDialogue.options.map((option) => (
            <Option
              visible={doneTyping}
              option={option}
              key={option.text}
              setState={setState}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Option({
  option,
  setState,
  visible,
}: {
  option: ComponentProps<typeof Dialogue>["dialogue"][0]["options"][0];
  setState: (next: string) => void;
  visible: boolean;
}) {
  const [currentPosition, setCurrentPosition] = useState([0, 0]);

  return (
    <button
      className={twMerge(
        "bg-white rounded-xl p-4 shadow-lg text-2xl hover:scale-110 transition-all relative opacity-0",
        visible && "opacity-100"
      )}
      style={{
        transform:
          option.movesAway &&
          `translate(${currentPosition[0]}px, ${currentPosition[1]}px)`,
      }}
      onMouseEnter={() => {
        if (option.movesAway && visible) {
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
