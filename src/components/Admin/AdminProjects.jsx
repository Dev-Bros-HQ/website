import { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseProvider";
import Modal from "../UI/Modal";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState({});
  const [open, setOpen] = useState(false);
  const { getProjects } = useFirebase();

  useEffect(() => {
    const fetchProjects = async () => {
      await getProjects(setProjects);
    };

    fetchProjects();
  }, []);

  const handleViewProjectDetails = (project) => {
    setActiveProject(project);
    setOpen(true);
  };

  return (
    <div>
      <p className="text-4xl">Dev Bros HQ Projects</p>
      <br />
      {projects.length ? (
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-secondary-focus">Name</th>
                <th className="bg-secondary-focus">Contributors</th>
                <th className="bg-secondary-focus"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => {
                return (
                  <ProjectRow
                    project={project}
                    handleViewProjectDetails={handleViewProjectDetails}
                    key={`project-${i}`}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>Loading...</>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-[900px] bg-neutral-content text-neutral py-12 px-6 rounded-lg">
          <div className="w-full flex items-end gap-4">
            <div className="w-full">
              <p className="text-2xl">Project: {activeProject.name}</p>
              <br />
              <div className="divider before:bg-secondary after:bg-secondary"></div>
              <br />
              <div>
                <p className="text-2xl">Contributors:</p>
                {activeProject?.contributors?.length
                  ? activeProject.contributors.map((contributor, i) => {
                      const {
                        displayName,
                        firstName,
                        lastName,
                        photoUrl,
                        notes,
                      } = contributor;
                      return (
                        <div
                          className="flex gap-2 mt-4"
                          key={`contributor-${i}`}
                        >
                          <div>
                            {photoUrl ? (
                              <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                  <img src={photoUrl} alt={displayName} />
                                </div>
                              </div>
                            ) : (
                              <div className="avatar placeholder">
                                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-secondary-focus">
                                  <p className="text-2xl">{`${firstName.charAt(
                                    0
                                  )}${lastName.charAt(0)}`}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            {notes?.map((note) => (
                              <p>{note}</p>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ProjectRow = ({ project, handleViewProjectDetails, ...props }) => {
  const [contributorsInfo, setContributorsInfo] = useState([]);
  const { name, contributors } = project;
  const { getContributors } = useFirebase();

  useEffect(() => {
    const fetchProjectContributors = async () => {
      const res = await getContributors(contributors);
      setContributorsInfo(res);
    };

    if (!contributorsInfo.length) {
      fetchProjectContributors();
    }
  }, []);

  return (
    <tr {...props}>
      <td className="border-secondary">
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td className="border-secondary">
        <div className="avatar-group -space-x-6 p-2">
          {contributorsInfo.length
            ? contributorsInfo.map((contributor, i) => {
                const { displayName, firstName, lastName, photoUrl } =
                  contributor;
                return (
                  <div key={`contributor-${i}`}>
                    {photoUrl ? (
                      <div className="avatar">
                        <div className="w-12 h-12">
                          <img src={photoUrl} alt={displayName} />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder bg-secondary-focus">
                        <div className="w-12 h-12 flex justify-center items-center">
                          <p className="text-2xl">{`${firstName.charAt(
                            0
                          )}${lastName.charAt(0)}`}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </td>
      <td className="border-secondary">
        <button
          className="btn btn-sm btn-accent"
          onClick={() =>
            handleViewProjectDetails({
              ...project,
              contributors: contributorsInfo,
            })
          }
        >
          details
        </button>
      </td>
    </tr>
  );
};

export default AdminProjects;
