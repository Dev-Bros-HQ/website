import { useEffect, useState } from "react";
import AdminHome from "../../components/Admin/AdminHome";
import AdminProjects from "../../components/Admin/AdminProjects";
import AdminUsers from "../../components/Admin/AdminUsers";
import Blog from "../../components/Admin/Blog";
import { useFirebase } from "../../context/FirebaseProvider";

const Page = () => {
  const [notAdminMessage, setNotAdminMessage] = useState("Loading...");
  const [activePage, setActivePage] = useState("admin-home");
  const { user } = useFirebase();
  const isAdmin = user?.admin;

  const pageMap = {
    "admin-home": <AdminHome />,
    "admin-users": <AdminUsers />,
    "admin-projects": <AdminProjects />,
    blog: <Blog />,
  };

  useEffect(() => {
    if (user?.uid && isAdmin === false) {
      setNotAdminMessage("You don't have permission to view this page.");
    }
  }, [user, isAdmin]);

  return (
    <section className="flex flex-col items-center py-9">
      {isAdmin ? (
        <div className="flex w-full gap-3">
          <aside className="min-h-16 w-full max-w-[250px] rounded-md bg-base-300 p-4">
            <div className="flex items-end gap-5">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-secondary ring-offset-2 ring-offset-base-100">
                  {user.photoUrl ? (
                    <img src={user.photoUrl} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        width="24px"
                        height="24px"
                        stroke-width="1.98"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="#ffffff"
                        className="m-0 scale-[175%]"
                      >
                        <path
                          d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z"
                          stroke="#ffffff"
                          stroke-width="1.98"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p>Hey{user.displayName ? `, ${user.displayName}.` : ""}</p>
            </div>
            <div className="divider"></div>
            <div className="flex min-h-[300px] w-full flex-col gap-1">
              <button
                className="btn-secondary btn-sm btn w-full justify-start"
                onClick={() => setActivePage("admin-home")}
              >
                Home
              </button>
              <button
                className="btn-secondary btn-sm btn w-full justify-start"
                onClick={() => setActivePage("admin-users")}
              >
                Users
              </button>
              <button
                className="btn-secondary btn-sm btn w-full justify-start"
                onClick={() => setActivePage("admin-projects")}
              >
                Projects
              </button>
              <button
                className="btn-secondary btn-sm btn w-full justify-start"
                onClick={() => setActivePage("blog")}
              >
                Blog
              </button>
            </div>
          </aside>
          <section className="w-full rounded-md bg-base-300 p-3">
            {pageMap[activePage]}
          </section>
        </div>
      ) : (
        <p>{notAdminMessage}</p>
      )}
    </section>
  );
};

export { Page };
