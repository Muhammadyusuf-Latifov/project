import { memo } from "react";
import {
  Users,
  ChartBarStacked,
  FileText,
  ShoppingCart,
  Smile,
} from "lucide-react";
import { useAuth } from "../../auth/service/useAuth";
import { useCategory } from "../../products/service/useCategory";
import rasm from "../../../shared/assets/me.png";
import go from "../../../shared/assets/kokLine.svg";
import goo from "../../../shared/assets/greenLine.svg";
import Doughnut from "../components/doughnut/Doughnut";
import BarChart from "../components/barChart/BarChart";
const Statistic = () => {
  const { getUsers, getProfile } = useAuth();
  const { data } = getUsers();
  const { data: profile } = getProfile();
  const { getCategory } = useCategory();
  const { data: category } = getCategory();
  console.log(profile);

  return (
    <section className="relative z-0">
      <div className="grid grid-cols-4 gap-[12px]">
        <div className="bg-statistic flex items-center p-[17px] justify-between rounded-[18px]">
          <div>
            <h3 className="text-[14px] text-[#A0AEC0]">All Users</h3>
            <p className="text-[#fff] text-[19px] font-bold">
              {data?.data?.length}
            </p>
          </div>
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[20px] bg-[#0075FF]">
            <Users className="text-[#fff]" />
          </div>
        </div>
        <div className="bg-statistic flex items-center p-[17px] justify-between rounded-[18px]">
          <div>
            <h3 className="text-[14px] text-[#A0AEC0]">Total Categories</h3>
            <p className="text-[#fff] text-[19px] font-bold">
              {category?.data?.length}
            </p>
          </div>
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[20px] bg-[#0075FF]">
            <ChartBarStacked className="text-[#fff]" />
          </div>
        </div>
        <div className="bg-statistic flex items-center p-[17px] justify-between rounded-[18px]">
          <div>
            <h3 className="text-[14px] text-[#A0AEC0]">New Clients</h3>
            <p className="text-[#fff] text-[19px] font-bold">
              3,052 <span className="text-green-500 text-[12px]">+12%</span>
            </p>
          </div>
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[20px] bg-[#0075FF]">
            <FileText className="text-[#fff]" />
          </div>
        </div>
        <div className="bg-statistic flex items-center p-[17px] justify-between rounded-[18px]">
          <div>
            <h3 className="text-[14px] text-[#A0AEC0]">Total Sales</h3>
            <p className="text-[#fff] text-[19px] font-bold">
              $1,010 <span className="text-green-500 text-[12px]">+8%</span>
            </p>
          </div>
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[20px] bg-[#0075FF]">
            <ShoppingCart className="text-[#fff]" />
          </div>
        </div>
      </div>
      <div className="statistic-me mt-[25px]">
        <div className="  h-[300px] rounded-[20px] relative overflow-hidden ">
          <div className="h-[100%]">
            <img
              src={rasm}
              className="max-w-[100%] w-[100%] h-[100%] max-h-[100%]"
              alt=""
            />
          </div>
          <div className="absolute top-0 p-[24px] flex flex-col h-full justify-between">
            <div>
              <p className="text-[#A0AEC0] text-[14px]">
                {profile?.data?.role}
              </p>
              <h2 className="text-[28px] text-[#fff] font-medium mb-[-4px] mt-[20px]">
                {profile?.data?.fname}
              </h2>
              <h2 className="text-[28px] text-[#fff] font-medium ">
                {profile?.data?.lname}
              </h2>
              <p>{profile?.data?.address}</p>
            </div>

            <p className="text-[#A0AEC0] text-[14px]">{profile?.data?.email}</p>
          </div>
        </div>
        <div className=" bg-statistic text-[#fff] p-[12px] rounded-[20px]">
          <h2 className="pl-[10px] text-[18px]">Satisfaction Rate</h2>
          <p className="mb-[26px] pl-[10px] text-[#A0AEC0] text-[14px]">
            From all projects
          </p>
          <div className=" relative ">
            <img className="block mx-auto" src={go} alt="" />
            <div className="bg-[#0075FF] absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full flex items-center justify-center">
              <Smile />
            </div>
            <div className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[100%] flex  justify-between bg-[#060B28BD] rounded-[20px] p-[17px]">
              <p className="text-[12px] text-[#A0AEC0]">0%</p>
              <div>
                <h2 className="text-center text-[22px] font-bold">95%</h2>
                <p className="text-center text-[12px] text-[#A0AEC0]">
                  Based on likes
                </p>
              </div>
              <p className="text-[12px] text-[#A0AEC0]">100%</p>
            </div>
          </div>
        </div>
        <div className="bg-statistic rounded-[20px] p-[14px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#fff] font-medium">Referral Tracking</h2>
            <div className="w-[35px] cursor-pointer rounded-[10px] h-[35px] flex items-center justify-center bg-[#232323ee]">
              <span className="text-[#7551FF] mt-[-2px]">•••</span>
            </div>
          </div>
          <div className="pt-[20px]  relative">
            <img className="block mx-auto" src={goo} alt="" />
            <div className="text-center absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <p className="text-[12px] text-[#A0AEC0] font-medium mb-[-15px]">
                Safety
              </p>
              <h2 className=" text-[52px] text-[#fff] font-bold mb-[-10px]">
                9.3
              </h2>
              <p className="text-[#A0AEC0] text-[12px] font-medium">
                Total Score
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="charts mt-[20px]">
        <div className="bg-statistic rounded-[20px] p-[20px]">
          <BarChart/>
        </div>
        <div className="rounded-[20px] bg-statistic p-[20px]">
          
          <Doughnut/>

         
        </div>
     </div>
    </section>
  );
};

export default memo(Statistic);
