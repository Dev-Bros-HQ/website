import React from "react";
import PageNotFound from "./PageNotFound";

export { Page };

function Page({ is404 }) {
  if (is404) {
    return (
      <>
        <PageNotFound />
      </>
    );
  } else {
    return (
      <>
        <h1>500 Internal Server Error</h1>
        <p>Something went wrong.</p>
      </>
    );
  }
}
