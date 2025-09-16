import { memo } from "react";
import logo from "../../shared/assets/logo.png";
import { NavLink } from "react-router-dom";
import { ShoppingBasket, User, ChartNoAxesCombined } from "lucide-react";
const Sidebar = () => {
  return (
    <div className="w-[250px] h-screen bg-slate-600 text-white">
      <div className="mt-[8px] ml-[12px] flex items-center ">
        <img className="block w-[70px] " loading="eager" src={logo} alt="" />
        <h2 className="text-[#23cfff] text-[22px] mt-[32px]">e-commerce</h2>
      </div>
      <div className="mt-[20px] flex flex-col p-[10px]">
        <NavLink className={"link"} to={"/"}>
          <ChartNoAxesCombined />
          <span>Statistic</span>
        </NavLink>
        <NavLink className={"link"} to={"/product"}>
          <ShoppingBasket/>
          <span>Product</span>
        </NavLink>
        <NavLink className={"link"} to={"/user"}>
          <User/>
          <span>User</span>
        </NavLink>
        <NavLink className={"link"} to={"/profile"}>
          <User/>
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default memo(Sidebar);
