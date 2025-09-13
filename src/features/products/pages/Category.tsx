import { Button, ConfigProvider, Input, Modal, Form } from "antd";
import { memo, useState } from "react";
import { useCategory } from "../service/useCategory";
import { useAuth } from "../../auth/service/useAuth";
import { ThreeDot } from "react-loading-indicators";

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

  const UserId = profile?.data?.id;

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
        <div className="flex items-center justify-between">
          <h2 className="text-[24px] text-slate-600">Category</h2>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#46c61f",
                  defaultColor: "#fff",
                  defaultBorderColor: "#46c61f",
                  defaultHoverBg: "#fff",
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
        <div className="overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white mt-[40px]">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">N#</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Created By</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: any, inx: number) => (
                <tr
                  key={item.id}
                  className="odd:bg-gray-50 even:bg-white hover:bg-slate-100 transition"
                >
                  <td className="px-4 py-3 font-medium text-slate-600">
                    {inx + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.user.fname}</td>
                  {UserId === item?.user?.id ? (
                    <td className="px-4 py-3 flex items-center justify-center gap-3">
                      <button
                        className="px-3 py-1.5 text-sm font-medium rounded-lg text-[#d00000] border"
                        onClick={() => deleteCategoryMutate(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-3 py-1.5 border text-sm font-medium text-[dodgerblue] rounded-lg      "
                        onClick={() => handleEdit(item)}
                      >
                        Update
                      </button>
                    </td>
                  ) : (
                    <td className="px-4 py-3 text-center text-gray-400">—</td>
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
