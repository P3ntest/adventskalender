import { useEffect, useState } from "react";

export function TurkeysPage() {
  const turkeys = [
    [1, 1],
    [1, -0.5],
    [-1, 1],
    [-0.5, -1],
    [0.5, -1],
    [0.6, 0.6],
    [-0.6, 0.6],
    [0.6, -0.6],
    [-0.6, -0.6],
    [0.5, 1],
  ] as [number, number][];

  const [caught, setCaught] = useState(0);

  const caughtAll = caught === turkeys.length;

  const setPage = useStore((s) => s.setPage);

  useEffect(() => {
    if (caughtAll) {
      setPage("postturkeys");
    }
  }, [caughtAll]);

  return (
    <div className="relative w-screen h-screen">
      {turkeys.map((t, i) => (
        <Turkey
          key={i}
          velocity={t}
          onCaught={() => {
            setCaught((c) => c + 1);
          }}
        />
      ))}
    </div>
  );
}

import turkeyImg from "../assets/turkey.png";
import { useStore } from "../store";

function Turkey({
  velocity,
  onCaught,
}: {
  velocity: [number, number];
  onCaught?: () => void;
}) {
  const [position, setPosition] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });

  const [caught, setCaught] = useState(false);

  const [mouseOn, setMouseOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((p) => ({
        x: p.x + velocity[0] * 0.005,
        y: p.y + velocity[1] * 0.005,
      }));
    }, 10);

    return () => {
      clearInterval(interval);
    };
  });

  const x = (1 - (position.x % 1)) % 1;
  const y = (1 - (position.y % 1)) % 1;

  if (caught) {
    return null;
  }

  return (
    <div
      className="absolute cursor-pointer select-none"
      style={{
        transform: `translate(calc(100vw * ${x}), calc(100vh * ${y}))`,
      }}
      onMouseDown={() => {
        setCaught(true);
        onCaught?.();
      }}
    >
      <img src={turkeyImg} className="w-40" />
    </div>
  );
}
