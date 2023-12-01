import { Dialogue } from "../components/Dialogue";
import { useStore } from "../store";

export function PostTurkeysPage() {
  const name = useStore((s) => s.name);
  const setPage = useStore((s) => s.setPage);

  return (
    <Dialogue
      dialogue={[
        {
          text: "You did it! You caught all 10 turkeys! Thank you so much! Here's the wishlist!",
          key: "hi",
          options: [],
        },
      ]}
    />
  );
}
