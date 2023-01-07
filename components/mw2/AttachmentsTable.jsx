import { useEffect, useState } from "react";
import { useMW2 } from "../../context/MW2Provider";

const AttachmentsTable = () => {
  const { attachments, getAttachments } = useMW2();
  const [formattedAttachments, setFormattedAttachments] = useState([]);
  const formatAttachmentsForTable = () => {
    const returnValue = [];
    for (let i = 0; i < Object.keys(attachments).length; i += 1) {
      const currAttachmentType = attachments[Object.keys(attachments)[i]];
      for (let j = 0; j < currAttachmentType.length; j += 1) {
        returnValue.push(currAttachmentType[j]);
      }
    }
    setFormattedAttachments(returnValue);
  };
  useEffect(() => {
    getAttachments();
  }, []);

  useEffect(() => {
    formatAttachmentsForTable();
  }, [attachments]);

  return (
    <div className="overflow-auto w-full max-h-80 relative border-primary border-2 rounded-xl">
      <table className="table table-compact w-full">
        <thead className="w-full sticky top-0">
          <tr>
            <th className="bg-primary text-primary-content">ID</th>
            <th className="bg-primary text-primary-content">Attachment Name</th>
            <th className="bg-primary text-primary-content">Attachment Type</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {formattedAttachments.length ? (
            formattedAttachments.map((attachment) => {
              return (
                <tr
                  key={`attachment-${attachment.id}-${attachment["attachment-type"]}`}
                >
                  <td className="w-2/12 bg-primary-content text-primary">
                    {attachment.id}
                  </td>
                  <td className="w-5/12 bg-primary-content text-primary">
                    {attachment["attachment-name"]}
                  </td>
                  <td className="w-4/12 bg-primary-content text-primary">
                    {attachment["attachment-type"]}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="w-2/12 bg-primary-content text-primary">
                No Attachments
              </td>
              <td className="w-5/12 bg-primary-content text-primary"></td>
              <td className="w-4/12 bg-primary-content text-primary"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttachmentsTable;
