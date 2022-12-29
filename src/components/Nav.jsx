import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import logo from "../assets/circle-dev-bros-hq.webp";
import { useFirebase } from "../context/firebase";

const Nav = () => {
  const {
    auth,
    authState: { user, loading, error },
  } = useFirebase();

  const logout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 pt-2 z-50">
      <div className="navbar bg-neutral text-neutral-content rounded-lg pl-4 mx-2 w-[calc(100%-16px)]">
        <div className="navbar-start">
          <Link
            className="btn btn-ghost normal-case text-xl rounded-full p-0"
            to="/"
          >
            <img src={logo} alt="dev bros hq logo" className="w-12 h-12" />
          </Link>
        </div>
        <div className="navbar-end">
          {user.admin ? (
            <ul className="menu menu-horizontal text-secondary">
              <li tabIndex={0}>
                <a className="rounded-lg">
                  Admin
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-neutral rounded-lg right-0 pt-4">
                  <li>
                    <Link to="/mw2-admin">MW2 Dashboard</Link>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            ""
          )}
          <ul className="menu menu-horizontal">
            <li tabIndex={0}>
              <a className="rounded-lg">
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
              </a>
              <ul className="p-2 bg-neutral rounded-lg right-0 pt-4">
                <li>
                  <Link to="/mw2-builds">MW2 Builds</Link>
                </li>
                <li>
                  <Link to="/magic-8">Magic 8 Ball</Link>
                </li>
                <li>
                  <Link to="/in-your-fridge">In Your Fridge</Link>
                </li>
              </ul>
            </li>
          </ul>
          {user.uid ? (
            <button className="btn btn-accent" onClick={logout}>
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in" className="btn btn-accent">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
