import { usePageContext } from "../../context/usePageContext";

const Page = () => {
  const { routeParams } = usePageContext();
  const developerPath = routeParams.name;

  return (
    <>
      <section className="flex flex-col items-center py-12">
        <h1 className="text-4xl text-accent font-bold">Whoops!</h1>
        <p className="pt-4 text-lg">
          <span className="capitalize">{developerPath}</span> hasn't set up
          their minifolio yet. Check back later!
        </p>
        <a href="/" alt="go home" className="mt-4 btn btn-primary">
          Go home
        </a>
      </section>
    </>
  );
};

export { Page };
