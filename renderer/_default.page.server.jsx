import ReactDOMServer from "react-dom/server";
import React from "react";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import { PageLayout } from "./PageLayout";

export { render };
export { passToClient };

// Example of `pageContext` often passed to the browser
const passToClient = ["pageProps"];

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const { documentProps } = pageContext.exports;
  const viewHtml = await ReactDOMServer.renderToString(
    <PageLayout pageContext={pageContext}>
      <Page {...pageProps} />
    </PageLayout>
  );

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
    <html data-theme="night">
      <head>
        <title>${ogTitle}</title>
        <meta charset="UTF-8" />
        <meta
          content="${ogTitle}"
          property="og:title"
        />
        <meta
          content="${ogDescription}"
          property="description"
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
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(viewHtml)}</div>
      </body>
    </html>`;
}
