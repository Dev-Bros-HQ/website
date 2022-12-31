const Page = () => {
  return (
    <>
      <section className="flex flex-col items-center">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-6xl text-center">MW2 Gun Builds</h1>
        <br />
        <p>By the community, for the community</p>
        <br />
        <a href="/mw2-builds/create" className="btn btn-secondary">
          Make build
        </a>
      </section>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "MW2 Gun Builds",
  "og:description":
    "We build tools for you to help us become better developers.View, rate, and create your favorite gun builds!",
};
