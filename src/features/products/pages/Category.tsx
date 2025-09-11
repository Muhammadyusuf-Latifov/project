import { Button, ConfigProvider, Input, Modal, Form } from "antd";
import { memo, useState } from "react";
import { useCategory } from "../service/useCategory";
import { useAuth } from "../../auth/service/useAuth";

const Category = () => {
  const [editCategory, setEditCategory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCategory, createCategory, deleteCategory, updateCategory } =
    useCategory();
  const [form] = Form.useForm();
  const { data } = getCategory();
  const { mutate } = createCategory();
  const { mutate: updateCategoryMutate } = updateCategory();
  const { mutate: deleteCategoryMutate } = deleteCategory();
  const { getProfile } = useAuth();
  const { data: profile } = getProfile();
  console.log(data);

  const UserId = profile?.data?.id;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (editCategory) {
      updateCategoryMutate({ id: editCategory.id, updated: values });
    } else {
      mutate(values);
    }
    setIsModalOpen(false);
    setEditCategory(null);
  };

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
            title="Add Category"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              initialValues={editCategory ? { name: editCategory.name } : {}}
            >
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
                  Submit
                </Button>
              </div>
            </Form>
          </Modal>
        </ConfigProvider>
      </div>
      <div className="grid grid-cols-6 gap-[12px] mt-[25px]">
        {data?.data?.map((item: any) => (
          <div key={item.id} className="rounded-[12px] bg-gray-400 p-[12px]">
            <h3 className="text-[18px] text-[#fff] text-center font-semibold">
              {item.name}
            </h3>

            {UserId === item?.user?.id ? (
              <div>
                <button onClick={() => deleteCategoryMutate(item.id)}>
                  Delete
                </button>
                <button onClick={() => showModal()}>Update</button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Category);
