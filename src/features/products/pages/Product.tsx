import { memo } from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locate = location.pathname.includes("category") ? "2" : "1";

  const onChange = (key: string) => {
    if (key === "1") navigate("");
    if (key === "2") navigate("category");
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Product",
      children: <Outlet />,
    },
    {
      key: "2",
      label: "Category",
      children: <Outlet />,
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              colorPrimary: "#23cfff",
              colorPrimaryHover: "#23cfff",
              inkBarColor: "#23cfff",
              itemActiveColor: "#23cfff",
              titleFontSize: 18,
              itemColor: "#286070",
              cardBg: "#fff"
            },
          },
        }}
      >
        <div className="mt-[4px]">
          <Tabs activeKey={locate} onChange={onChange} items={items} />
        </div>
      </ConfigProvider>
      <div>
        
      </div>
    </>
  );
};

export default memo(Product);
