import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MW2Builds = () => {
  return (
    <>
      <Helmet>
        <title>MW2 Gun Builds | Dev Bros HQ</title>
        <meta content="MW2 Gun Builds | Dev Bros HQ" property="og:title" />
        <meta
          content="View, rate, and create your favorite gun builds!"
          property="og:description"
        />
        <meta content="https://devbroshq.com/" property="og:url" />
        <meta
          content="https://devbroshq.com/square-dev-bros-hq-title.webp"
          property="og:image"
        />
        <meta content="#3ABFF8" data-react-helmet="true" name="theme-color" />
      </Helmet>
      <section className="flex flex-col items-center">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-6xl text-center">MW2 Gun Builds</h1>
        <br />
        <p>By the community, for the community</p>
        <br />
        <Link to="/mw2-builds/create" className="btn btn-secondary">
          Make build
        </Link>
      </section>
    </>
  );
};

export default MW2Builds;
