import { memo, useState } from "react";
import { useProduct } from "../service/useProduct";
import rasm from "../../../shared/assets/image copy.png";
import { Button, ConfigProvider, Input, Modal, Select, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Form } from "antd";
import { ThreeDot } from "react-loading-indicators";
import { useCategory } from "../service/useCategory";

import { useAuth } from "../../auth/service/useAuth";

const ProductItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getProduct, createProduct, deleteProduct } = useProduct();
  const { getCategory } = useCategory();
  const { mutate } = createProduct();
  const { mutate: deleteProductMutate } = deleteProduct();
  const { data: infoCategory } = getCategory();
  const { data, isFetching } = getProduct(9);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const images = files && Array.from(files);
  const { getProfile } = useAuth();
  const { data: profile } = getProfile();
  console.log(profile);

  const categoryOptions = infoCategory?.data?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const fList = newFileList
      .map((file) => file.originFileObj as File)
      .filter(Boolean);
    setFiles(fList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      +<div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("stock", values.stock);
    formData.append("price", values.price);
    formData.append("description", values.description || "");
    formData.append("brand", values.brand || "");
    formData.append("categoryId", values.categoryId);
    images?.forEach((file) => {
      formData.append("images", file);
    });
    mutate(formData);
    form.resetFields();
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
      <div className="ProductItem">
        <div className="flex items-center justify-between max-w-[90%] w-[100%] mx-auto">
          <h2 className="text-[26px] font-medium  text-[#2e5aa1]">Products</h2>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "dodgerblue",
                  defaultColor: "#fff",
                  defaultBorderColor: "dodgerblue",
                  defaultHoverBg: "#fff",
                  defaultHoverColor: "dodgerblue",
                  defaultHoverBorderColor: "dodgerblue",
                  defaultActiveBg: "#fff",
                  defaultActiveColor: "dodgerblue",
                  defaultActiveBorderColor: "dodgerblue",
                  borderRadius: 8,
                },
              },
            }}
          >
            <Button onClick={showModal} type="default" size="large">
              Add Product
            </Button>

            <Modal
              title={"Add Product"}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  label="Product title"
                  name="title"
                  rules={[
                    { required: true, message: "Please enter product name" },
                  ]}
                >
                  <Input placeholder="Enter category name" />
                </Form.Item>
                <Form.Item
                  label="Stock"
                  name="stock"
                  rules={[{ required: true, message: "Please enter stock" }]}
                >
                  <Input placeholder="Enter stock" />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please enter product price" },
                  ]}
                >
                  <Input placeholder="Enter product price" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter product descrtiption",
                    },
                  ]}
                >
                  <Input placeholder="Enter product description" />
                </Form.Item>
                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[
                    { required: true, message: "Please enter product brand" },
                  ]}
                >
                  <Input placeholder="Enter product brand" />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[{ required: true, message: "Please enter category" }]}
                >
                  <Select
                    placeholder="Category"
                    className="w-[100%]"
                    options={categoryOptions}
                  />
                </Form.Item>
                <Form.Item label="Upload the images">
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>

                <div className="flex justify-end gap-3 mt-[30px]">
                  <button
                    type="button"
                    className="bg-[#e82929] px-[14px] rounded-[8px] text-[#fff] duration-200
                     hover:bg-[#fa3d3d]"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <Button type="primary" htmlType="submit">
                    {"Create"}
                  </Button>
                </div>
              </Form>
            </Modal>
          </ConfigProvider>
        </div>
        <div className="grid grid-cols-3 gap-[12px] mt-[60px] max-w-[90%] w-[100%] mx-auto">
          {data?.allProducts?.map((item: any) => (
            <div className="border border-[#ddd] rounded-[4px]" key={item.id}>
              <div className="p-[10px]">
                {item?.images.length === 0 ? (
                  <img
                    className="block w-[100%] h-[300px] bg-[#ddd]"
                    src={rasm}
                    alt=""
                  />
                ) : (
                  <img
                    className="block w-[100%] h-[300px] bg-[#ddd] object-cover"
                    src={`https://api.errorchi.uz/product/image/${item.images[0]}`}
                    alt=""
                  />
                )}
              </div>
              <div className="px-[15px] py-[8px]">
                <h3 className="text-[18px] line-clamp-1 font-medium" title={item.title}>{item.title}</h3>
                <p
                  className="line-clamp-1 text-[#989898]"
                  title={item.description}
                >
                  {item.description}
                </p>
                <p className="text-[#dbb406] font-bold">{item.price} USD</p>
                <p
                  className="line-clamp-2 text-[#35789a] font-medium"
                  title={item.user.email}
                >
                  Created by:{" "}
                  {profile?.data?.id === item?.user?.id
                    ? "you"
                    : item.user.email}
                </p>
                {profile?.data?.id === item?.user?.id ? (
                  <button
                    onClick={() => deleteProductMutate(item.id)}
                    className="px-[20px] py-[6px] rounded-[8px] border mt-[10px] border-[red] text-red-600 bg-[#fff]"
                  >
                    Delete
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default memo(ProductItem);
