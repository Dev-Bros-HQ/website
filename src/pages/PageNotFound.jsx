import { Link, useLocation } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  return (
    <div className="w-full h-[50vh] flex flex-col justify-center items-center">
      <p className="text-6xl text-error mb-5">🤔 404</p>
      <h1 className="text-4xl">We couldn't find the page:</h1>
      <code className="text-2xl my-5 bg-base-300 px-6 py-2 rounded-md shadow-sm">
        {location.pathname}
      </code>
      <Link to="/" className="btn btn-lg btn-accent">
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
