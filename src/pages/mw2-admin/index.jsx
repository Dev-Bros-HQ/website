import { useEffect, useState } from "react";
import AddAttachment from "../../components/mw2/AddAttachment";
import AddGun from "../../components/mw2/AddGun";
import AttachmentsTable from "../../components/mw2/AttachmentsTable";
import GunsTable from "../../components/mw2/GunsTable";
import ImageParallaxScroller from "../../components/UI/ImageParallaxScroller";
import { useFirebase } from "../../context/firebase";

const MW2Admin = () => {
  const [notAdminMessage, setNotAdminMessage] = useState("Loading...");
  const { authState } = useFirebase();
  const isAdmin = authState?.user?.admin;

  useEffect(() => {
    if (authState.user !== {} && isAdmin === false) {
      setNotAdminMessage("You don't have permission to view this page.");
    }
  }, [authState, isAdmin]);

  return (
    <section className="flex flex-col items-center">
      {isAdmin ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <ImageParallaxScroller />
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

export default MW2Admin;
