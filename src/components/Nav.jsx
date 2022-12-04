import { Link } from "react-router-dom";
import logo from "../assets/circle-dev-bros-hq.webp";

const Nav = () => {
  return (
    <nav className="sticky top-0 pt-2">
      <div className="navbar bg-neutral text-neutral-content rounded-lg pl-4">
        <div className="navbar-start">
          <Link
            className="btn btn-ghost normal-case text-xl rounded-full p-0"
            to="/"
          >
            <img src={logo} alt="dev bros hq logo" className="w-12 h-12" />
          </Link>
        </div>
        <div className="navbar-end">
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
              </ul>
            </li>
          </ul>
          <ul className="menu menu-horizontal">
            <li tabIndex={0}>
              <a className="rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </a>
              <ul
                tabIndex={0}
                className="p-2 bg-neutral rounded-lg right-0 pt-4"
              >
                <li>
                  <Link to="/">Homepage</Link>
                </li>
                <li>
                  <Link to="/">Portfolio</Link>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
