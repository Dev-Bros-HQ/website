import { useState, useEffect } from "react";
import { useFirebase } from "../../context/FirebaseProvider";

const Contributors = ({ projectName }) => {
  const [contributors, setContributors] = useState([]);
  const [projectInfo, setProjectInfo] = useState(undefined);
  const { getDocumentByPath, getProject } = useFirebase();

  useEffect(() => {
    const fetchProjectInfo = async () => {
      const projectInf = await getProject(projectName);
      setProjectInfo(projectInf);
      if (projectInf.contributors && !contributors.length) {
        const contributors = await Promise.all(
          projectInf?.contributors?.map(({ user }) =>
            getDocumentByPath("users", user.id)
          )
        );

        const filteredContributors = contributors.map((user) => {
          const {
            photoUrl,
            firstName,
            lastName,
            displayName,
            key,
            developerPath,
          } = user;
          const notes = projectInf.contributors.filter((contributor) => {
            return contributor.user.id === key;
          })[0].notes;
          return {
            photoUrl,
            firstName,
            lastName,
            displayName,
            notes,
            developerPath,
          };
        });

        setContributors(filteredContributors);
      }
    };

    if (!projectInfo) {
      fetchProjectInfo();
    }
  }, []);

  return (
    <div className="w-full p-4 my-32">
      <b className="text-3xl">Contributors</b>
      <p>These people helped make this page.</p>
      <br />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(486px,1fr))] gap-5">
        {contributors.length ? (
          contributors.map((contributor, index) => {
            const { notes, firstName, lastName, photoUrl, developerPath } =
              contributor || {};
            return (
              <div
                className="bg-gradient-to-br from-primary to-accent p-5 rounded-md flex gap-4"
                key={`contributor-${index}`}
              >
                <div className="flex flex-col items-center gap-4 w-40">
                  <div className="avatar z-20">
                    <div className="w-24 h-24 rounded-full shadow-md bg-neutral">
                      {photoUrl ? (
                        <img src={photoUrl} />
                      ) : (
                        <p className="w-full h-full flex justify-center items-center text-3xl">
                          {firstName.charAt(0)}
                          {lastName.charAt(0)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="justify-end">
                    <a
                      href={`developers/${developerPath || ""}`}
                      className="btn text-secondary btn-sm py-3 h-auto"
                    >
                      View Minifolio
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h2 className="text-4xl text-neutral font-bold">
                    {firstName} {lastName}
                  </h2>
                  <div className="flex flex-col gap-3 w-full">
                    <div className="mockup-code shadow-md">
                      {notes.map((note) => (
                        <p key={note} className="px-5 pt-2 font-mono">
                          {note}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};

export default Contributors;
