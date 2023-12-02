import { useState } from "react";
import { Dialogue } from "../components/Dialogue";
import { useStore } from "../store";
import { twMerge } from "tailwind-merge";

const questions = [
  [
    "What's your favorite holiday treat, Scki?",
    "Well, I used to love 'paw-faits,' but now I'm all about 'bark-lava cakes'!",
  ],
  [
    "Do you have any holiday traditions, Scki?",
    "Oh, absolutely! Every Christmas Eve, I howl along to 'Bark the Halls' carols. It's a real tail-wagger!",
  ],
  [
    "Have you been naughty or nice this year, Scki?",
    "Well, I did eat some ornaments, but I swear it was just to add a little sparkle to my life!",
  ],
  [
    "What's the best way to stay warm in winter, Scki?",
    "Oh, I've got that covered! Just roll around in a pile of freshly fallen snow and voila - instant fur coat upgrade!",
  ],
  [
    "Any advice for dealing with holiday stress, Scki?",
    "Take a cue from us huskies: When in doubt, just run in circles until you feel better. Works like a charm!",
  ],
  [
    "What's your secret to looking so fluffy, Scki?",
    "It's all in the fur-care routine - a daily blend of belly rubs, ear scratches, and the occasional treat for that extra shine!",
  ],
];

const sequences = [];
for (let i = 0; i < questions.length; i++) {
  sequences.push({
    text: questions[i][1],
    options: [
      {
        text: "Can I see the wishlist?",
        next: `wishlist`,
      },
      ...(i < questions.length - 1
        ? [
            {
              text: questions[i + 1][0],
              next: `q${i + 1}`,
            },
          ]
        : []),
    ],
    key: `q${i}`,
  });
}

export function PostTurkeysPage() {
  const name = useStore((s) => s.name);
  const setPage = useStore((s) => s.setPage);

  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <>
      <div className="w-screen h-screen fixed flex items-center justify-center">
        <div
          className={twMerge(
            "bg-amber-200 z-50 translate-y-[1000px] transition-all p-20 rounded-xl max-w-3xl",
            showWishlist && "translate-y-0"
          )}
        >
          <h1 className="text-3xl mb-4">Julius' Wishlist</h1>
          <p className="text-xl">
            Dear Santa, <br />
            This year for christmas I only have one material wish: I would love
            to have an{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://www.apple.com/de/shop/buy-watch/apple-watch/45mm-cellular-mitternacht-aluminium-mitternacht-sportarmband-m-l"
            >
              Apple Watch
            </a>
            .
            <br />
            I just spent the last 4 hours building this interactive website for
            you, so I my creativity is a bit exhausted. I hope you can forgive
            me for that. <br />
            <br />
            Love, <br />
            Julius
          </p>
        </div>
      </div>
      {!showWishlist && (
        <Dialogue
          dialogue={[
            {
              text: "You did it! You caught all 10 turkeys! Now we have all the pieces to construct the wishlist!",
              options: [
                {
                  text: "Awesome, lets see it!",
                  next: "wishlist",
                },
                {
                  text: questions[0][0],
                  next: "q0",
                },
              ],
            },
            ...sequences,
            {
              text: "Sure thing! Here it is:",
              key: "wishlist",
              options: [
                {
                  text: "[Wishlist]",
                  callback: () => {
                    setShowWishlist(true);
                  },
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
}
