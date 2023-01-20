import { useMW2 } from "../../context/MW2Provider";
import { useEffectOnce } from "../../hooks/useEffectOnce";

const GunsTable = () => {
  const { guns, getGuns } = useMW2();

  useEffectOnce(getGuns);

  return (
    <div className="overflow-auto w-full max-h-80 relative border-primary border-2 rounded-xl">
      <table className="table table-compact w-full">
        <thead className="w-full sticky top-0">
          <tr>
            <th className="bg-primary text-primary-content">ID</th>
            <th className="bg-primary text-primary-content">Gun Name</th>
            <th className="bg-primary text-primary-content">Class</th>
            <th className="bg-primary text-primary-content">Ammunition</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {Object.keys(guns).length ? (
            Object.keys(guns).map((key) => {
              const gun = guns[key];
              return (
                <tr key={`gun-${gun.id}`}>
                  <td className="w-1/12 bg-primary-content text-primary">
                    {gun.id}
                  </td>
                  <td className="w-4/12 bg-primary-content text-primary">
                    {gun["gun-name"]}
                  </td>
                  <td className="w-4/12 bg-primary-content text-primary">
                    {gun.class}
                  </td>
                  <td className="w-3/12 bg-primary-content text-primary">
                    {gun.ammunition}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="w-1/12 bg-primary-content text-primary">
                No Guns
              </td>
              <td className="w-4/12 bg-primary-content text-primary"></td>
              <td className="w-4/12 bg-primary-content text-primary"></td>
              <td className="w-3/12 bg-primary-content text-primary"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GunsTable;
