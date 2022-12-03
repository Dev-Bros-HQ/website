import { useEffect } from "react";
import { Link } from "react-router-dom";
import { themeChange } from "theme-change";
import logo from "../assets/circle-dev-bros-hq.webp";

const Nav = () => {
  const themeOptions = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  useEffect(() => {
    themeChange(false);
  });

  return (
    <nav className="sticky pt-2">
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
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-4 p-2 shadow bg-neutral rounded-lg w-52 right-[-7px]"
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
              <li>
                <select
                  className="select w-full select-md max-w-xs"
                  data-choose-theme
                  defaultValue="night"
                >
                  <option disabled value="night">
                    Select Theme
                  </option>
                  {themeOptions.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
