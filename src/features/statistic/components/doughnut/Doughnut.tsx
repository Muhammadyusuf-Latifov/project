import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { memo, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [dummy, setDummy] = useState<any>(null);
  const [skip, setSkip] = useState<number>(0);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products", { params: { limit: 5, skip } })
      .then((res) => setDummy(res.data));
  }, [skip]);
  console.log(dummy);
  console.log();

  const data = {
    labels: dummy?.products?.map((item: any) =>
      item?.title.split(" ").slice(0, 2).join(" ")
    ),
    datasets: [
      {
        label: "# of Stocks",
        data: dummy?.products?.map((item:any) => item?.stock),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative">
      <Doughnut data={data} />
      <button
        onClick={() => setSkip((p) => p + 1)}
        className="absolute top-[56%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-[#0069d2d8] duration-150 cursor-pointer text-[#fff] hover:opacity-[.9]"
      >
        next
      </button>
    </div>
  );
};
export default memo(DoughnutChart);
