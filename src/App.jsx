import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { FirebaseProvider } from "./context/firebase";
import Home from "./pages/Home";
import MW2Builds from "./pages/mw2-builds";
import MW2Admin from "./pages/mw2-builds/admin";
import PageNotFound from "./pages/PageNotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <FirebaseProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/mw2-admin" element={<MW2Admin />} />
          <Route path="/mw2-builds" element={<MW2Builds />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </FirebaseProvider>
  );
}

export default App;
