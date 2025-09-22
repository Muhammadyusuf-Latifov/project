import { memo, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/service/useAuth";
import { useDispatch } from "react-redux";
import { removeToken } from "../features/auth/store/authSlice";
import { LogOut, Bell, Menu } from "lucide-react";
import BackgroundGradient from "./components/mainBackground/BackgroundAnimation";

const DashboardLayout = () => {
  const { getProfile } = useAuth();
  const { isError } = getProfile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      dispatch(removeToken());
    }
  }, [isError]);
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <BackgroundGradient>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <header className="dash-head ">
            <div className="flex items-center justify-between w-[100%]">
              <div className="boder">
                <Menu className="text-[#fff]  w-[35px] h-[35px]" />
              </div>
              <div className="flex items-center gap-[12px] text-[#fff]">
                <Bell className="" />
                <LogOut onClick={() => handleLogOut()} />
              </div>
            </div>
          </header>
          <section className="p-5">
            <Outlet />
          </section>
        </main>
      </div>
    </BackgroundGradient>
  );
};

export default memo(DashboardLayout);
