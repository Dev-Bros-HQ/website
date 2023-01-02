import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import { PageLayout } from "./PageLayout";

export { render };

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    document.getElementById("page-view"),
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  );
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
