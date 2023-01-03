import React from "react";
import ReactDOM from "react-dom/client";
import { PageLayout } from "./PageLayout";
import "./index.css";

export { render };

let root;
async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const page = (
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  );
  const container = document.getElementById("page-view");
  if (container.innerHTML === "" || !pageContext.isHydration) {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
    // SSR
  } else {
    root = ReactDOM.hydrateRoot(container, page);
  }
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
