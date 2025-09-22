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
              colorPrimary: "#80B3FF",
              colorPrimaryHover: "#80B3FF",
              inkBarColor: "#80B3FF",
              itemActiveColor: "#80B3FF",
              titleFontSize: 18,
              itemColor: "#fff",
              cardBg: "#fff",
            },
          },
        }}
      >
        <div className="mt-[4px] ">
          <Tabs activeKey={locate} onChange={onChange} items={items} />
        </div>
      </ConfigProvider>
     
    </>
  );
};

export default memo(Product);
