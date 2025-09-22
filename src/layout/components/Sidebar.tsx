import { memo } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBasket,
  User,
  ChartNoAxesCombined,
  UserPen,
} from "lucide-react";
import { useAuth } from "../../features/auth/service/useAuth";
const Sidebar = () => {
  const { getProfile } = useAuth();
  const { data, isFetching } = getProfile();
  const navigate = useNavigate();

  const me = data?.data;
  return (
    <div className="sidebar-orqa w-[250px] relative z-0 h-screen  text-white">
      <div
        className="mt-[14px] cursor-pointer ml-[12px] flex items-center  gap-[12px]"
        onClick={() => navigate("/profile")}
      >
        <div className="bg-[#1e8fff2b] w-[50px] h-[50px] flex items-center justify-center rounded-full">
          <p className="text-[18px] font-bold">{me?.fname?.slice(0, 1)}</p>
        </div>
        <div>
          {isFetching ? (
            <>
              <h2>Name</h2> <p>role</p>
            </>
          ) : (
            <>
              <h2> {me?.fname}</h2>
              <p>{me?.role}</p>
            </>
          )}
        </div>
      </div>
      <div className="bg-[#c6c6c6] h-[1.5px] max-w-[220px] border-0 rounded-[200%] w-[100%] mx-auto mt-[10px]"></div>
      <div className=" flex flex-col p-[10px]">
        <NavLink className={"link"} to={"/"}>
          <div className=" p-[6px] bg-[#252b4a] rounded-[12px] flex items-center justify-center">
            <ChartNoAxesCombined className="icon text-[#0075FF]" />
          </div>
          <span>Statistic</span>
        </NavLink>

        <NavLink className={"link"} to={"/product"}>
          <div className=" p-[6px] bg-[#252b4a] rounded-[12px] flex items-center justify-center">
            <ShoppingBasket className="icon text-[#0075FF]" />
          </div>
          <span>Product</span>
        </NavLink>
        <NavLink className={"link"} to={"/user"}>
          <div className=" p-[6px] bg-[#252b4a] rounded-[12px] flex items-center justify-center">
            <User className="icon text-[#0075FF]" />
          </div>
          <span>User</span>
        </NavLink>
        <NavLink className={"link"} to={"/profile"}>
          <div className=" p-[6px] bg-[#252b4a] rounded-[12px] flex items-center justify-center">
            <UserPen className="icon text-[#0075FF]" />
          </div>
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default memo(Sidebar);
