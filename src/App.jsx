import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { FirebaseProvider } from "./context/firebase";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <FirebaseProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </FirebaseProvider>
  );
}

export default App;
