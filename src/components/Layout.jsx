import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-5xl mx-auto relative">
        <Nav />
        <div className="min-h-[calc(100vh-72px)]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
