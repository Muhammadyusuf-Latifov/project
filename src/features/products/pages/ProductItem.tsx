import { memo, useEffect, useState } from "react";
import { useProduct } from "../service/useProduct";
import rasm from "../../../shared/assets/image copy.png";
import { Button, ConfigProvider, Input, Modal, Select, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Form } from "antd";
import { ThreeDot } from "react-loading-indicators";
import { useCategory } from "../service/useCategory";
import { useAuth } from "../../auth/service/useAuth";
import { SquarePen, Trash2 } from "lucide-react";

const ProductItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const { getProduct, createProduct, deleteProduct, updateProduct } =
    useProduct();
  const { getCategory } = useCategory();
  const { mutate } = createProduct();
  const { mutate: deleteProductMutate } = deleteProduct();
  const { data: infoCategory } = getCategory();
  const { data, isFetching } = getProduct(9, page);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [editProduct, setEditProduct] = useState<any>(null);
  const { mutate: updateProductMutate } = updateProduct();

  const images = files && Array.from(files);
  const { getProfile } = useAuth();
  const { data: profile } = getProfile();
  const me = profile?.data;

  const categoryOptions = infoCategory?.data?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

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

  const handleEdit = (item: any) => {
    setEditProduct(item);
    form.setFieldsValue({
      title: item.title,
      description: item.description,
      stock: item.stock,
      price: item.price,
      brand: item.brand,
      categoryId: item.category.id,
    });

    if (item.images?.length) {
      const mappedFiles: UploadFile[] = item.images.map(
        (img: string, index: number): UploadFile => ({
          uid: String(index),
          name: `image-${index}`,
          status: "done",
          url: `https://api.errorchi.uz/product/image/${img}`,
        })
      );
      setFileList(mappedFiles);
    } else {
      setFileList([]);
    }

    setIsModalOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setFileList([]);
    setEditProduct(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (editProduct) {
      if (files.length > 0) {
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
        updateProductMutate({ id: editProduct?.id, data: formData });
      } else {
        const body = {
          ...values,
          images: fileList.map((f) =>
            f.url ? f.url.split("/").pop() : f.name
          ),
        };
        updateProductMutate({ id: editProduct?.id, ...body });
      }
    } else {
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
    }
    form.resetFields();
    setEditProduct(null);
    setFileList([]);
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
  }

  return (
    <div className="ProductItem mt-[40px]">
      <div className="flex items-center justify-between max-w-[90%] w-[100%] mx-auto">
        <h2 className="text-[26px] font-medium  text-[#fff]">Products</h2>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBg: "dodgerblue",
                defaultColor: "#fff",
                defaultBorderColor: "dodgerblue",
                defaultHoverBg: "transparent",
                defaultHoverColor: "dodgerblue",
                defaultHoverBorderColor: "dodgerblue",
                defaultActiveBg: "transparent",
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
            title={editProduct ? "Update Product" : "Add Product"}
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
                <Input placeholder="Enter product name" />
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
                    message: "Please enter product description",
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
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select
                  placeholder="Category"
                  className="w-[100%]"
                  options={categoryOptions}
                />
              </Form.Item>
              <Form.Item label="Upload the images">
                <Upload
                  multiple
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
                  {editProduct ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          </Modal>
        </ConfigProvider>
      </div>

      <div className="grid grid-cols-3 gap-[12px] mt-[60px] max-w-[90%] w-[100%] mx-auto">
        {data?.allProducts?.map((item: any) => (
          <div
            className="rounded-[5px] bg-statistic overflow-hidden"
            key={item.id}
          >
            <div>
              {item?.images.length === 0 ? (
                <img
                  className="block w-[100%] h-[300px] bg-[#26345bad]"
                  src={rasm}
                  alt=""
                />
              ) : (
                <img
                  className="block w-[100%] h-[300px] bg-[#26345bad] object-cover"
                  src={`https://api.errorchi.uz/product/image/${item.images[0]}`}
                  alt=""
                />
              )}
            </div>
            <div className="px-[15px] py-[8px]">
              <h3
                className="text-[18px] text-[#fff] line-clamp-1 font-medium"
                title={item.title}
              >
                {item.title}
              </h3>
              <p
                className="line-clamp-1 text-[#c7c7c7]"
                title={item.description}
              >
                {item.description}
              </p>
              <div>
                <p className="text-[#dbb406] font-bold">${item.price}</p>
                <p
                  className="line-clamp-2 text-[#acacac] font-medium"
                  title={item.user.email}
                >
                  Created by:
                  {profile?.data?.id === item?.user?.id
                    ? "you"
                    : item.user.email}
                </p>
                {me?.role === "owner" ||
                profile?.data?.id === item?.user?.id ? (
                  <div className="flex items-center gap-[4px] mt-[16px]">
                    <button
                      onClick={() => deleteProductMutate(item.id)}
                      className="bg-[crimson] w-[40%] flex items-center gap-[8px] rounded-[12px] justify-center py-[6px] duration-150 hover:opacity-[.8] text-[#fff]"
                    >
                      <Trash2 className="text-[#fff] w-[20px] h-[20px]" />
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-[#0d5eae] w-[40%] flex items-center gap-[8px] rounded-[12px] justify-center py-[6px] duration-150 hover:opacity-[.8] text-[#fff]"
                    >
                      <SquarePen className="text-[#fff] w-[20px] h-[20px]" />
                      Update
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-[20px] gap-[12px]">
        <button
          disabled={page == 0}
          onClick={() => setPage((p) => p - 9)}
          className="px-[40px] duration-200 py-[12px] text-[#fff] rounded-[12px] bg-[dodgerblue] hover:bg-[#0979d4] disabled:bg-[#7096bb]"
        >
          Previous page
        </button>
        <button
          onClick={() => setPage((p) => p + 9)}
          className="px-[40px] text-[#fff] duration-200 py-[12px] rounded-[12px] bg-[dodgerblue] hover:bg-[#0979d4]"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default memo(ProductItem);
