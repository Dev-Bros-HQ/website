import { useFirebase } from "../../context/firebase";

const MW2Builds = () => {
  const { builds, attachments, createMW2Build, createMW2Attachment } =
    useFirebase();
  const values = {
    createdAt: new Date(),
  };
  const callback = () => {
    console.log("CREATED A NEW GUN BUILD");
    window.location.reload();
  };

  console.log({ builds, attachments });
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
        console.log({ barrel });
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
        console.log({ muzzle });
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
      <br />
      <br />
      <br />
      <button onClick={() => createMW2Attachment(values, "barrels", callback)}>
        Create Mock Barrel
      </button>
      <br />
      <br />
      <br />
      <button onClick={() => createMW2Attachment(values, "muzzles", callback)}>
        Create Mock Muzzle
      </button>
    </div>
  );
};

export default MW2Builds;
