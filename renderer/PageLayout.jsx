import React from "react";
import Layout from "./Layout";
import { FirebaseProvider } from "../context/firebase";
import { PageContextProvider } from "./usePageContext";

function PageLayout({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <FirebaseProvider>
          <Layout>{children}</Layout>
        </FirebaseProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

export { PageLayout };
