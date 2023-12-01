import { Background } from "./components/Background";
import { AccountPage } from "./pages/CreateAccount";
import { PostSignupPage } from "./pages/PostSignup";
import { PostTurkeysPage } from "./pages/PostTurkeys";
import { PresentPage } from "./pages/Present";
import { TurkeysPage } from "./pages/Turkeys";
import { useStore } from "./store";

export function App() {
  return (
    <div>
      <Background />
      <div className="z-50 fixed w-screen h-screen">
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
