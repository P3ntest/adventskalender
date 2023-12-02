import { useEffect, useState } from "react";
import { Background } from "./components/Background";
import { AccountPage } from "./pages/CreateAccount";
import { PostSignupPage } from "./pages/PostSignup";
import { PostTurkeysPage } from "./pages/PostTurkeys";
import { PresentPage } from "./pages/Present";
import { TurkeysPage } from "./pages/Turkeys";
import { useStore } from "./store";

export function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const listener = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", listener);
    listener();
    return () => window.removeEventListener("resize", listener);
  });

  if (!isDesktop) {
    return (
      <div>
        <Background />
        <div className="w-screen h-screen flex items-center justify-center">
          <h1 className="text-center z-50 text-white font-bold p-20 text-4xl drop-shadow-2xl">
            Sorry, this interactive experience is only available on larger
            screens.
          </h1>
          B
        </div>
      </div>
    );
  }

  return (
    <div>
      <Background />
      <div className="z-30 fixed w-screen h-screen">
        <CurrentPage />
      </div>
    </div>
  );
}

function CurrentPage() {
  const page = useStore((s) => s.page);

  if (page === "present") {
    return <PresentPage />;
  } else if (page === "create-account") {
    return <AccountPage />;
  } else if (page === "postsignup") {
    return <PostSignupPage />;
  } else if (page === "turkeys") {
    return <TurkeysPage />;
  } else if (page === "postturkeys") {
    return <PostTurkeysPage />;
  }
}
