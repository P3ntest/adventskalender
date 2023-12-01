import backgroundImg from "../assets/background.jpg";
import Snowfall from "react-snowfall";

export function Background() {
  return (
    <div className="-z-30">
      <div
        className="fixed w-screen h-screen blur scale-110"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          filter: "grayscale(0.3) blur(9px)",
        }}
      ></div>
      <div
        className="fixed w-screen h-screen"
        style={{
          filter: "blur(2px)",
        }}
      >
        <Snowfall snowflakeCount={300} color="white" />
      </div>
    </div>
  );
}
