import { useFirebase } from "../../context/firebase";

const MW2Builds = () => {
  const { builds } = useFirebase();
  return (
    <div>
      MW2 Builds
      {JSON.stringify(builds)}
    </div>
  );
};

export default MW2Builds;
