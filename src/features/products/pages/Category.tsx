import { Button, ConfigProvider, Input, Modal, Form } from "antd";
import { memo, useState } from "react";
import { useCategory } from "../service/useCategory";
import { useAuth } from "../../auth/service/useAuth";
import { ThreeDot } from "react-loading-indicators";
import { Trash2, SquarePen } from "lucide-react";

const Category = () => {
  const [editCategory, setEditCategory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateCategory, getCategory, createCategory, deleteCategory } =
    useCategory();

  const { data, isFetching } = getCategory();
  const { mutate } = createCategory();
  const { mutate: updateCategoryMutate } = updateCategory();
  const { mutate: deleteCategoryMutate } = deleteCategory();
  const { getProfile } = useAuth();
  const { data: profile } = getProfile();
  console.log(data);

  const [form] = Form.useForm();

  const me = profile?.data;
  console.log(me);

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (item: any) => {
    setEditCategory(item);
    form.setFieldsValue({ name: item.name });
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    if (editCategory) {
      updateCategoryMutate({ id: editCategory.id, ...values });
    } else {
      mutate(values);
    }
    form.resetFields();
    setEditCategory(null);
    handleCancel();
  };
  if (isFetching) {
    return (
      <section>
        <div className="flex items-center justify-center mt-[200px]">
          <ThreeDot color="#09d5e5" size="medium" text="" textColor="" />
        </div>
      </section>
    );
  } else {
    return (
      <div className="Category">
        <div className="flex items-center justify-end">
          
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#46c61f",
                  defaultColor: "#fff",
                  defaultBorderColor: "#46c61f",
                  defaultHoverBg: "transparent",
                  defaultHoverColor: "#46c61f",
                  defaultHoverBorderColor: "#46c61f",
                  defaultActiveBg: "#e6f7ec",
                  defaultActiveColor: "#46c61f",
                  defaultActiveBorderColor: "#46c61f",
                  borderRadius: 8,
                },
              },
            }}
          >
            <Button onClick={showModal} type="default" size="large">
              Add Category
            </Button>

            <Modal
              title={editCategory ? "Update Category" : "Add Category"}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  label="Category Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter category name" },
                  ]}
                >
                  <Input placeholder="Enter category name" />
                </Form.Item>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-[#e82929] px-[14px] rounded-[8px] text-[#fff] duration-200
                     hover:bg-[#fa3d3d]"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <Button type="primary" htmlType="submit">
                    {editCategory ? "Update" : "Create"}
                  </Button>
                </div>
              </Form>
            </Modal>
          </ConfigProvider>
        </div>
        <div className="bg-user pt-[30px]   overflow-hidden rounded-xl shadow-md px-[12px]   mt-[40px]">
          <p className="pl-[15px] text-[18px] text-[#fff] font-bold">
            Category Table
          </p>
          <table className="w-full border-collapse">
            <thead className="user-table text-[#A0AEC0] text-[14px] mb-[20px] ">
              <tr className="border-b border-b-[#56577A]">
                <th className="px-4 py-[20px] text-left">N#</th>
                <th className="px-4 py-[20px] text-left">Category</th>
                <th className="px-4 py-[20px] text-left">Created By</th>

                <th className="px-4 py-[20px] text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#ddd] text-[14px] font-light">
              {data?.data?.map((item: any, inx: number) => (
                <tr key={item.id} className="border-b border-b-[#56577A]">
                  <td className="px-4 py-[20px] font-medium text-[#ddd]">
                    {inx + 1}
                  </td>
                  <td className="px-4 py-[15px] font-medium">
                    <p className="text-[16px]">{item?.name}</p>
                  </td>
                  <td className="px-4 py-[15px] font-medium">
                    <p className="text-[16px] ">
                      {item?.user.fname ? item?.user?.fname : "unknown"}
                    </p>
                    <p className="text-12px] text-[#a6a6a6]">
                      {item?.user?.email}
                    </p>
                  </td>

                  {me?.role === "owner" ? (
                    <td className="px-4 py-[20px] text-center flex items-center gap-[8px] text-gray-400">
                      <button
                        onClick={() => deleteCategoryMutate(item.id)}
                        className="w-[35px] flex items-center justify-center h-[35px] rounded-full bg-[#c20101] duration-150 hover:bg-[#ce1515]"
                      >
                        <Trash2 className="text-[#fff] w-[20px] h-[20px]" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-[35px] flex items-center justify-center h-[35px] rounded-full bg-[dodgerblue] duration-150 hover:opacity-[.8]"
                      >
                        <SquarePen className="text-[#fff] w-[20px] h-[20px]" />
                      </button>
                    </td>
                  ) : me?.id === item?.user?.id ? (
                    <td className="px-4 py-[20px] text-center flex items-center gap-[8px] text-gray-400">
                      <button
                        onClick={() => deleteCategoryMutate(item.id)}
                        className="w-[35px] flex items-center justify-center h-[35px] rounded-full bg-[#c20101] duration-150 hover:bg-[#ce1515]"
                      >
                        <Trash2 className="text-[#fff] w-[20px] h-[20px]" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-[35px] flex items-center justify-center h-[35px] rounded-full bg-[dodgerblue] duration-150 hover:opacity-[.8]"
                      >
                        <SquarePen className="text-[#fff] w-[20px] h-[20px]" />
                      </button>
                    </td>
                  ) : (
                    <td className="px-4 py-3 pl-[40px] text-gray-400">—</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default memo(Category);
