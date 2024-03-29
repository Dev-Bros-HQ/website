import { useEffect, useState } from "react";
import AddAttachment from "../../components/mw2/AddAttachment";
import AddGun from "../../components/mw2/AddGun";
import AttachmentsTable from "../../components/mw2/AttachmentsTable";
import GunsTable from "../../components/mw2/GunsTable";
import { useFirebase } from "../../context/FirebaseProvider";

const Page = () => {
  const [notAdminMessage, setNotAdminMessage] = useState("Loading...");
  const { user } = useFirebase();
  const isAdmin = user?.admin;

  useEffect(() => {
    if (user?.uid && isAdmin === false) {
      setNotAdminMessage("You don't have permission to view this page.");
    }
  }, [user, isAdmin]);

  return (
    <section className="flex flex-col items-center">
      {isAdmin ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <h1 className="text-6xl text-center">MW2 Admin Dashboard</h1>
          <br />
          <br />
          <br />
          <div className="flex w-full items-center gap-3 my-4">
            <h2 className="text-4xl">GUNS</h2>
            <AddGun />
          </div>
          <GunsTable />
          <br />
          <br />
          <br />
          <div className="flex w-full items-center gap-3 my-4">
            <h2 className="text-4xl">ATTACHMENTS</h2>
            <AddAttachment />
          </div>
          <AttachmentsTable />
          <br />
          <br />
          <br />
          <br />
        </>
      ) : (
        <p>{notAdminMessage}</p>
      )}
    </section>
  );
};

export { Page };
