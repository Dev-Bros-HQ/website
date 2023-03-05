import { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseProvider";
import Modal from "../UI/Modal";

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
        <div className="overflow-x-auto w-full">
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
                          <div className="mask mask-squircle w-12 h-12">
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
                        <div className="badge badge-success">Yes</div>
                      ) : (
                        <div className="badge badge-error">No</div>
                      )}
                    </td>
                    <td className="border-secondary">
                      {developer ? (
                        <div className="badge badge-success">Yes</div>
                      ) : (
                        <div className="badge badge-error">No</div>
                      )}
                    </td>
                    <td className="border-secondary">
                      <button
                        className="btn btn-sm btn-accent"
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
        <>Loading...</>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-[900px] bg-neutral-content text-neutral py-12 px-6 rounded-lg">
          <div className="flex items-end gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                {activeUser.photoUrl ? (
                  <div className="avatar">
                    <div className="w-24 h-24">
                      <img
                        src={activeUser.photoUrl}
                        alt={activeUser.displayName}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder bg-secondary-focus">
                    <div className="w-24 h-24 flex justify-center items-center">
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
              <div className="flex gap-3 mt-2">
                {activeUser.admin ? (
                  <div className="badge badge-primary">Admin</div>
                ) : (
                  ""
                )}
                {activeUser.developer ? (
                  <div className="badge badge-accent">Developer</div>
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
