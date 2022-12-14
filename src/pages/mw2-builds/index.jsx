import { Link } from "react-router-dom";

const MW2Builds = () => {
  return (
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
  );
};

export default MW2Builds;
