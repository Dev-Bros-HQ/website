import { usePageContext } from "../../../context/usePageContext";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { useMW2 } from "../../../context/MW2Provider";

const Page = () => {
  const pageContext = usePageContext();
  const buildID = pageContext.routeParams.id;
  const { getMW2Build } = useMW2();
  const [build, setBuild] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBuild = async (id) => {
    if (id.length) {
      await getMW2Build(id, setBuild);
    }
  };

  useEffect(() => {
    fetchBuild(buildID);
  }, [buildID]);

  useEffect(() => {
    if (Object.keys(build).length) {
      setLoading(false);
    }
  }, [build]);
  console.log(build);

  return (
    <>
      <section className="flex flex-col items-center w-full max-w-[1280px] mx-auto ">
        {loading ? <Spinner /> : JSON.stringify(build)}
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
