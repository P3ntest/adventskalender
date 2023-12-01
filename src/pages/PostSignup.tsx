import { Dialogue } from "../components/Dialogue";
import { useStore } from "../store";

export function PostSignupPage() {
  const name = useStore((s) => s.name);
  const setPage = useStore((s) => s.setPage);

  return (
    <Dialogue
      dialogue={[
        {
          text: "Oh hey, welcome back! Nice to meet you, " + name + "!",
          options: [
            {
              text: "Hi Scki!",
              next: "hi",
            },
            {
              text: "The account creation experience sucked",
              movesAway: true,
            },
          ],
        },
        {
          text: "While you were gone, I found a christmas butterfly! So delicious!",
          key: "hi",
          options: [
            {
              text: "Can I see Julius' wishlist now please?",
              next: "wishlist",
            },
            {
              text: "I'm hungry too, how did it taste?",
              next: "taste",
            },
          ],
        },
        {
          key: "taste",
          text: "It tasted like a christmas butterfly!",
          options: [
            {
              text: "Can I see Julius' wishlist now please?",
              next: "wishlist",
            },
          ],
        },
        {
          key: "wishlist",
          text: "Yes of course! There's just one small problem... When I was chasing the butterfly, I accidentally dropped the wishlist into an industrial meat grinder. I'm so sorry! It got shredded into 10 pieces and got stuffed into 10 different thanksgiving turkeys. You'll have to catch all 10 turkeys to get the wishlist back! But be careful, they're very fast!",
          options: [
            {
              text: "No problem Scki, I'll get them for you!",
              callback: () => {
                setPage("turkeys");
              },
            },
            {
              text: "You fluffing idiot Scki. Get them yourself.",
              movesAway: true,
            },
          ],
        },
      ]}
    />
  );
}
