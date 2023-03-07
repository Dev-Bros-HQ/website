import { signOut } from "firebase/auth";
import logo from "../assets/circle-dev-bros-hq.webp";
import { useFirebase } from "../context/FirebaseProvider";
import { auth } from "../context/firebaseConfig";

const Nav = () => {
  const { user } = useFirebase();

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 pt-2">
      <div className="mx-2 flex w-[calc(100%-16px)] justify-between gap-3 rounded-lg bg-neutral p-2 text-neutral-content">
        <div className="min-w-12 flex items-center justify-center">
          <a
            className="btn-ghost btn w-full rounded-full p-0 text-xl normal-case"
            href="/"
          >
            <img
              src={logo}
              alt="dev bros hq logo"
              className="w-full max-w-[48px]"
            />
          </a>
        </div>
        <div className="grid w-[75%] max-w-md grid-cols-3 gap-3">
          {user?.admin ? (
            <a
              className="btn-outline btn-secondary btn rounded-lg"
              href="/admin"
            >
              Admin
            </a>
          ) : (
            ""
          )}
          <ul className="menu menu-compact menu-horizontal flex w-full">
            <li tabIndex={0} className="h-full w-full">
              <button className="btn-sm btn h-full w-full rounded-md p-0 md:btn-md">
                Tools
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </button>
              <ul className="right-0 rounded-md bg-neutral p-1">
                <li>
                  <a href="/mw2-builds">MW2 Builds</a>
                </li>
                <li>
                  <a href="/magic-8">Magic 8 Ball</a>
                </li>
                <li>
                  <a href="/box-breathe">Box Breathing</a>
                </li>
                <li>
                  <a href="/daily-todo">Daily Todo</a>
                </li>
              </ul>
            </li>
          </ul>
          {user?.uid ? (
            <button className="btn-accent btn" onClick={logout}>
              Sign Out
            </button>
          ) : (
            <a href="/sign-in" className="btn-accent btn">
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
