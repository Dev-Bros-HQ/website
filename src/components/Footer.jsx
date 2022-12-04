import { Link } from "react-router-dom";
import logo from "../assets/circle-dev-bros-hq.webp";
const Footer = () => {
  return (
    <footer className="bg-secondary-focus text-secondary-content body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/mw2-builds" className="text-base">
                  MW2 Gun Builds
                </Link>
              </li>
              <li>
                <a className="text-base">Second Link</a>
              </li>
              <li>
                <a className="text-base">Third Link</a>
              </li>
              <li>
                <a className="text-base">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-secondary-content tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-base">First Link</a>
              </li>
              <li>
                <a className="text-base">Second Link</a>
              </li>
              <li>
                <a className="text-base">Third Link</a>
              </li>
              <li>
                <a className="text-base">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-secondary-content tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-base">First Link</a>
              </li>
              <li>
                <a className="text-base">Second Link</a>
              </li>
              <li>
                <a className="text-base">Third Link</a>
              </li>
              <li>
                <a className="text-base">Fourth Link</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div className="container px-9 py-6 mx-auto flex items-start sm:items-center sm:flex-row flex-col">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-secondary-content"
          >
            <img src={logo} alt="dev bros hq logo" className="w-10 h-10" />
            <span className="ml-3 text-xl">Dev Bros HQ</span>
          </Link>
          <p className="text-sm sm:ml-6 sm:mt-0 mt-4">© 2022 Dev Bros HQ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
