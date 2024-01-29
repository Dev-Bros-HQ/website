import { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseProvider";
import Modal from "../UI/Modal";
import Spinner from "../Spinner";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [open, setOpen] = useState(false);
  const { getUsers } = useFirebase();

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers(setUsers);
    };

    fetchUsers();
  }, []);

  const handleViewUserDetails = (user) => {
    setActiveUser(user);
    setOpen(true);
    console.log({ user });
  };

  return (
    <div>
      <p className="text-4xl">Dev Bros HQ Users</p>
      <br />
      {users.length ? (
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-secondary-focus">Name</th>
                <th className="bg-secondary-focus">Admin</th>
                <th className="bg-secondary-focus">Developer</th>
                <th className="bg-secondary-focus"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const {
                  displayName,
                  photoUrl,
                  firstName,
                  lastName,
                  admin,
                  developer,
                  uid,
                } = user;
                return (
                  <tr key={uid}>
                    <td className="border-secondary">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {photoUrl ? (
                              <div className="avatar">
                                <div className="h-12 w-12">
                                  <img src={photoUrl} alt={displayName} />
                                </div>
                              </div>
                            ) : (
                              <div className="placeholder avatar bg-secondary-focus">
                                <div className="flex h-12 w-12 items-center justify-center">
                                  <p className="text-2xl">{`${firstName.charAt(
                                    0
                                  )}${lastName.charAt(0)}`}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {firstName} {lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-secondary">
                      {admin ? (
                        <div className="badge-success badge">Yes</div>
                      ) : (
                        <div className="badge-error badge">No</div>
                      )}
                    </td>
                    <td className="border-secondary">
                      {developer ? (
                        <div className="badge-success badge">Yes</div>
                      ) : (
                        <div className="badge-error badge">No</div>
                      )}
                    </td>
                    <td className="border-secondary">
                      <button
                        className="btn-accent btn-sm btn"
                        onClick={() => handleViewUserDetails(user)}
                      >
                        details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <Spinner size="lg" color="primary" />
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-[900px] rounded-lg bg-neutral-content py-12 px-6 text-neutral">
          <div className="flex items-end gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-secondary ring-offset-2 ring-offset-base-100">
                {activeUser.photoUrl ? (
                  <div className="avatar">
                    <div className="h-24 w-24">
                      <img
                        src={activeUser.photoUrl}
                        alt={activeUser.displayName}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="placeholder avatar bg-secondary-focus">
                    <div className="flex h-24 w-24 items-center justify-center">
                      <p className="text-2xl">{`${activeUser?.firstName?.charAt(
                        0
                      )}${activeUser?.lastName?.charAt(0)}`}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-2xl">
                {activeUser.firstName} {activeUser.lastName}
              </p>
              <i className="text-2xllg">{activeUser.email}</i>
              <div className="mt-2 flex gap-3">
                {activeUser.admin ? (
                  <div className="badge-primary badge">Admin</div>
                ) : (
                  ""
                )}
                {activeUser.developer ? (
                  <div className="badge-accent badge">Developer</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="divider before:bg-secondary after:bg-secondary"></div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
