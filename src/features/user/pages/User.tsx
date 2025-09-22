import { memo } from "react";
import { useAuth } from "../../auth/service/useAuth";
import { ThreeDot } from "react-loading-indicators";
import { Trash2 } from "lucide-react";
const User = () => {
  const { getUsers, getProfile, deleteUser } = useAuth();
  const { data, isFetching } = getUsers();
  const user = data?.data;
  const { mutate } = deleteUser();
  const { data: me } = getProfile();
  console.log(user);

  if (isFetching) {
    return (
      <section>
        <div className="flex items-center justify-center mt-[200px]">
          <ThreeDot color="#09d5e5" size="medium" text="" textColor="" />
        </div>
      </section>
    );
  }
  return (
    <div className="relative z-40">
      <h2 className="text-[24px] text-[#fff]">Users</h2>

      <div className="bg-user pt-[30px]   overflow-hidden rounded-xl shadow-md px-[12px]   mt-[40px]">
        <p className="pl-[15px] text-[18px] text-[#fff] font-bold">
          Authors Table
        </p>
        <table className="w-full border-collapse">
          <thead className="user-table text-[#A0AEC0] text-[14px] mb-[20px] ">
            <tr className="border-b border-b-[#56577A]">
              <th className="px-4 py-[20px] text-left">N#</th>
              <th className="px-4 py-[20px] text-left">Author</th>
              <th className="px-4 py-[20px] text-left">Role</th>

              <th className="px-4 py-[20px] text-left">Status</th>
              <th className="px-4 py-[20px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#ddd] text-[14px] font-light">
            {user?.map((item: any, inx: number) => (
              <tr key={item.id} className="border-b border-b-[#56577A]">
                <td className="px-4 py-[20px] font-medium text-[#ddd]">
                  {inx + 1}
                </td>
                <td className="px-4 py-[15px] font-medium">
                  <p className="text-[16px]">
                    {item?.fname} {item?.lname}
                  </p>
                  <p className="text-[12px] text-[#A0AEC0]">{item.email}</p>
                </td>
                <td className="px-4 py-[20px] font-medium text-[#ddd]">
                  {item.role}
                </td>
                {item.isActive ? (
                  <td className="px-4 py-[20px]">
                    <span className="bg-green-500 text-[#fff] px-[10px] py-[5px] rounded-[10px]">
                      Active
                    </span>
                  </td>
                ) : (
                  <td className="px-4 py-[20px]">
                    <span className="px-[10px] text-[#fff] rounded-[10px] py-[5px] bg-[#ff3636]">
                      Suspended
                    </span>
                  </td>
                )}

                {me?.data.role === "owner" ? (
                  <td className="px-4 py-[20px] text-center text-gray-400 ">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => mutate(item.id)}
                        className="w-[35px] flex items-center justify-center h-[35px] rounded-full bg-[red] duration-150 hover:bg-[#ce1515]"
                      >
                        <Trash2 className="text-[#fff] w-[20px] h-[20px]" />
                      </button>
                    </div>
                  </td>
                ) : (
                  <td className="px-4 py-[20px] text-center text-gray-400">
                    —
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(User);
