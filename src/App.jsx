import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { FirebaseProvider } from "./context/firebase";
import Home from "./pages/Home";
import MW2Builds from "./pages/mw2-builds";

function App() {
  return (
    <FirebaseProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mw2-builds" element={<MW2Builds />} />
        </Routes>
      </Layout>
    </FirebaseProvider>
  );
}

export default App;
