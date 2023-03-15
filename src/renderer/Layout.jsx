import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Nav from "../components/UI/Nav";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      <Toaster position="bottom-right" />
      <div className="relative mx-auto w-full max-w-6xl">
        <Nav />
        <div className="min-h-[calc(75vh-72px)]">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
