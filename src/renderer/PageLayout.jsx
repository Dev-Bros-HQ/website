import React from "react";
import Layout from "./Layout";
import { PageContextProvider } from "./usePageContext";
import { FirebaseProvider } from "../context/FirebaseProvider";
import { MW2Provider } from "../context/MW2Provider";

function PageLayout({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <FirebaseProvider>
          <MW2Provider>
            <Layout>{children}</Layout>
          </MW2Provider>
        </FirebaseProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

export { PageLayout };
