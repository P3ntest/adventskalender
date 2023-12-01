import { twMerge } from "tailwind-merge";

export const PresentPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Present />
    </div>
  );
};

import { useSpring, animated, useSprings } from "@react-spring/web";

import presentImg from "../assets/present.png";
import { useEffect, useState } from "react";

function Present() {
  const springs = useSpring({
    from: { y: -800 },
    to: { y: 0 },
    // delay: 1000,
    config: {
      tension: 30,
      friction: 0,
      duration: 1000,
      damping: 0.4,
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <animated.div
      style={{
        transform: springs.y.to((y) => `translateY(${y}px)`),
      }}
      className="relative"
    >
      <div
        className={twMerge(
          "transition-all",
          !open && "hover:scale-110 cursor-pointer"
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        {open && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Bone />
          </div>
        )}
        <div
          className={twMerge(
            "flex flex-row items-center cursor-pointer  transition-all",
            !open && "animate-bounce"
          )}
        >
          <SplitImage index open={open} />
          <SplitImage index={false} open={open} />
        </div>
      </div>
    </animated.div>
  );
}

function SplitImage({ index, open }: { index: boolean; open?: boolean }) {
  const [props, api] = useSpring(
    () => ({
      from: {
        x: 0,
        y: 0,
        rotate: 0,
      },
      config: {
        tension: 30,
        friction: 0,
        duration: 1000,
        damping: 0.4,
      },
    }),
    []
  );

  useEffect(() => {
    if (open) {
      api.start({
        x: 1000 * (index ? -1 : 1),
        y: 1000,
        rotate: 1000 * (index ? -1 : 1),
        config: {
          duration: 3000,
          mass: 100,
          friction: 100,
          tension: 100,
        },
      });
    }
  }, [open]);

  return (
    <animated.div
      style={{
        ...props,
      }}
    >
      <div
        className=""
        style={{
          backgroundImage: `url(${presentImg})`,
          width: 200,
          height: 400,
          backgroundSize: "cover",
          backgroundPositionX: index ? "0%" : "100%",
        }}
      ></div>
    </animated.div>
  );
}

import boneImg from "../assets/bone.png";
import { Dialogue } from "../components/Dialogue";
import { useStore } from "../store";
function Bone() {
  const setPage = useStore((s) => s.setPage);

  return (
    <>
      <img src={boneImg} className="w-40 animate-spin" />
      <Dialogue
        dialogue={[
          {
            text: "Hello! I'm Scki, the Christmas Husky!",
            options: [
              {
                text: "Hi Scki!",
                next: "hi",
              },
              {
                text: "Fluff off!",
                callback: () => {
                  window.location.href =
                    "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Rick Roll
                },
              },
            ],
          },
          {
            text: "You seem to have found a present, how lucky! ... On a completely unrelated note, I really like bones.",
            key: "hi",
            options: [
              {
                text: "Would you like a bone? I have one right here!",
                next: "getsbone",
              },
              {
                text: "Okay.",
                next: "okay",
              },
            ],
          },
          {
            text: "... Do you like to eat bones yourself?",
            key: "okay",
            options: [
              {
                text: "Yes",
                next: "plshave",
              },
              {
                text: "No",
                next: "plshave",
              },
            ],
          },
          {
            text: "Please?",
            key: "please",
            options: [
              {
                text: "Okay fine",
                next: "getsbone",
              },
            ],
          },
          {
            text: "Hm, may I please have it? It would make me very happy!",
            key: "plshave",
            options: [
              {
                text: "Sure",
                next: "getsbone",
              },
              {
                text: "No",
                next: "please",
              },
            ],
          },
          {
            text: "Thank you so much! After Julius gave me his wishlist and told me to keep it safe, he just left and never came back. I havn't had a bone in weeks! What a fluffling horrible owner.",
            key: "getsbone",
            options: [
              {
                text: "I'm sure he'll come back, he's just very busy working on your present!",
                next: "busy",
              },
              {
                text: "Yea he sucks",
                movesAway: true,
              },
            ],
          },
          {
            text: "Oh, I guess you're right. I'm sure he'll be back soon. I'll just wait here. Anyways, would you like to see his wishlist?",
            key: "busy",
            options: [
              {
                text: "Yes!",
                next: "wishlist",
              },
              {
                text: "No.",
                next: "dontwant",
              },
            ],
          },
          {
            text: "Oh. - Well, I thought... Why the fluff are you here then?",
            key: "dontwant",
            options: [
              {
                text: "I'm here to steal your bones.",
                next: "stealbones",
              },
              {
                text: "Nevermind. Show me the wishlist.",
                next: "wishlist",
              },
            ],
          },
          {
            text: "Oh, I see. Well, I guess I'll just have to defend myself then. I'm sorry, but I can't let you do that. I also can't show you the wishlist, because I don't trust you anymore.",
            key: "stealbones",
            options: [
              {
                text: "I'm sorry, I misspoke. Can I please see the wishlist?",
                next: "wishlist",
              },
            ],
          },
          {
            text: "Okay! In order for me to show you the wishlist, you'll first have to create an account here on this website. I'll wait here until you're done.",
            key: "wishlist",
            options: [
              {
                text: "Let's do it!",
                next: "cookies",
              },
            ],
          },
          {
            text: "Great! Oh and by the way, I forgot to tell you: This website uses cookies to provide you with the best experience possible. Do you accept?",
            key: "cookies",
            options: [
              {
                text: "Yes, create account",
                callback: () => {
                  setPage("create-account");
                },
              },
              {
                text: "No",
                movesAway: true,
              },
            ],
          },
        ]}
      />
    </>
  );
}
