import { memo, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/service/useAuth";
import { useDispatch } from "react-redux";
import { removeToken } from "../features/auth/store/authSlice";
import { LogOut, Bell, Menu } from "lucide-react";

const DashboardLayout = () => {
  const { getProfile } = useAuth();
  const { isError } = getProfile();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(removeToken());
    }
  }, [isError]);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="w-full  py-[20px] bg-slate-600 sticky top-0 z-30 pr-[20px]">
          <div className="flex items-center justify-between">
            <div className="boder">
              <Menu className="text-[#fff]  w-[35px] h-[35px]" />
            </div>
            <div className="flex items-center gap-[12px] text-[#fff]">
              <Bell className=""/>
              <LogOut />
            </div>
          </div>
        </header>
        <section className="p-5">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default memo(DashboardLayout);
