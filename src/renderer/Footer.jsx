import logo from "../assets/circle-dev-bros-hq.webp";
const Footer = () => {
  return (
    <footer className="body-font bg-secondary-focus py-2 text-neutral-content">
      <div className="container card mx-auto bg-base-300 px-5 py-12">
        <div className="order-first flex flex-wrap md:text-left">
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <h2 className="title-font mb-3 text-sm font-medium tracking-widest text-neutral-content">
              Links
            </h2>
            <nav className="mb-10 list-none">
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
                  <a href="/blog" className="text-base">
                    Blog
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <h2 className="title-font mb-3 text-sm font-medium tracking-widest">
              Tools
            </h2>
            <nav className="mb-10 list-none">
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
                  <a href="/box-breathe" className="text-base">
                    Box Breathing
                  </a>
                </li>
                <li>
                  <a href="/daily-todo" className="text-base">
                    Daily Todos
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <div className="container mx-auto flex flex-col items-start px-4 pt-2 pb-0 sm:flex-row sm:items-center">
            <a
              href="/"
              className="title-font flex items-center justify-center font-medium text-neutral-content md:justify-start"
            >
              <img src={logo} alt="dev bros hq logo" className="h-10 w-10" />
              <span className="ml-3 text-xl">Dev Bros HQ</span>
            </a>
            <p className="mt-4 text-sm sm:ml-6 sm:mt-0">© 2022 Dev Bros HQ</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
