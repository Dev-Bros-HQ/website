import { Link } from "react-router-dom";
import logo from "../assets/circle-dev-bros-hq.webp";
const Footer = () => {
  return (
    <footer className="text-base-content body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-primary tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to="/mw2-builds"
                  className="text-base-content hover:text-secondary"
                >
                  MW2 Gun Builds
                </Link>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Second Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Third Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-primary tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-base-content hover:text-secondary">
                  First Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Second Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Third Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-primary tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-base-content hover:text-secondary">
                  First Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Second Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Third Link
                </a>
              </li>
              <li>
                <a className="text-base-content hover:text-secondary">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-primary"
          >
            <img src={logo} alt="dev bros hq logo" className="w-10 h-10" />
            <span className="ml-3 text-xl">Dev Bros HQ</span>
          </Link>
          <p className="text-sm text-base-content sm:ml-6 sm:mt-0 mt-4">
            © 2022 Dev Bros HQ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
