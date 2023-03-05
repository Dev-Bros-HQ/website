import ReactDOMServer from "react-dom/server";
import React from "react";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import { PageLayout } from "./PageLayout";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export { render };
export { passToClient };

// Example of `pageContext` often passed to the browser
const passToClient = ["pageProps", "popularTools", "routeParams", "$$typeof"];

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const { documentProps } = pageContext.exports;
  // console.log({ pageContext, pageProps });
  let viewHtml;
  if (pageContext.Page) {
    // For SSR pages
    viewHtml = ReactDOMServer.renderToString(
      <PageLayout pageContext={pageContext}>
        <Page {...pageProps} />
      </PageLayout>
    );
  } else {
    // For SPA pages
    viewHtml = "";
  }

  const SEO = {
    "og:title": "Dev Bros HQ",
    "og:description":
      "We build tools for you to help us become better developers.",
    "og:url": "https://devbroshq.com/",
    "og:image": "https://devbroshq.com/square-dev-bros-hq-title.webp",
    ...documentProps,
  };

  const {
    "og:title": ogTitle,
    "og:description": ogDescription,
    "og:url": ogUrl,
    "og:image": ogImage,
  } = SEO;

  return escapeInject`<!DOCTYPE html>
    <html data-theme="night" lang="en">
      <head>
        <title>${ogTitle}</title>
        <meta charset="UTF-8" />
        <meta
          content="${ogTitle}"
          property="og:title"
        />
        <meta
          content="${ogDescription}"
          name="description"
        />
        <meta
          content="${ogDescription}"
          property="og:description"
        />
        <meta
          content="${ogUrl}"
          property="og:url"
        />
        <meta
          content="${ogImage}"
          property="og:image"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F1YWPQQ7QY"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-F1YWPQQ7QY');
        </script>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(viewHtml)}</div>
      </body>
    </html>`;
}
