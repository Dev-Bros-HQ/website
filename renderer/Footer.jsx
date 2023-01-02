import logo from "../assets/circle-dev-bros-hq.webp";
const Footer = () => {
  return (
    <footer className="bg-secondary-focus text-neutral-content body-font pb-2">
      <div className="card bg-base-300 container px-5 py-12 mx-auto">
        <div className="flex flex-wrap md:text-left order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-neutral-content tracking-widest text-sm mb-3">
              Links
            </h2>
            <nav className="list-none mb-10">
              <ul>
                <li>
                  <a href="/" className="text-base">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-base">
                    About
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Fourth Link
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-sm mb-3">
              Tools
            </h2>
            <nav className="list-none mb-10">
              <ul>
                <li>
                  <a href="/mw2-builds" className="text-base">
                    MW2 Gun Builds
                  </a>
                </li>
                <li>
                  <a href="/magic-8" className="text-base">
                    Magic 8 Ball
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Fourth Link
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-neutral-content tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <ul>
                <li>
                  <a href="/" className="text-base">
                    First Link
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Second Link
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="/" className="text-base">
                    Fourth Link
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <div className="container px-4 pt-2 pb-0 mx-auto flex items-start sm:items-center sm:flex-row flex-col">
            <a
              href="/"
              className="flex title-font font-medium items-center md:justify-start justify-center text-neutral-content"
            >
              <img src={logo} alt="dev bros hq logo" className="w-10 h-10" />
              <span className="ml-3 text-xl">Dev Bros HQ</span>
            </a>
            <p className="text-sm sm:ml-6 sm:mt-0 mt-4">© 2022 Dev Bros HQ</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
