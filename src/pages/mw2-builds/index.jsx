import { useFirebase } from "../../context/firebase";

const MW2Builds = () => {
  const { builds, attachments, createMW2Build } = useFirebase();
  const values = {
    createdAt: new Date(),
  };
  const callback = () => {
    window.location.reload();
  };
  return (
    <div>
      MW2 Builds
      <p>Builds</p>
      {JSON.stringify(builds)}
      <br />
      <br />
      <br />
      <p>Attachemnts</p>
      {attachments?.barrels?.map((barrel) => {
        return (
          <div key={barrel.id}>
            {barrel.id}
            {barrel?.createdAt?.toDate().toLocaleTimeString("en-US")}
          </div>
        );
      })}
      <br />
      <br />
      <p>Muzzles</p>
      {attachments?.muzzles?.map((muzzle) => {
        return (
          <div key={muzzle.id}>
            {muzzle.id}
            {muzzle?.createdAt?.toDate().toLocaleTimeString("en-US")}
          </div>
        );
      })}
      <br />
      <br />
      <br />
      <button onClick={() => createMW2Build(values, callback)}>
        Create Mock Build
      </button>
    </div>
  );
};

export default MW2Builds;
