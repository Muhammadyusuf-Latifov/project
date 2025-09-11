import { memo, useState } from "react";
import { Button } from "antd";

import { api } from "../../../shared/api";

const ProductsTab = () => {
  const [files, setFiles] = useState<null | FileList>(null);

  const images = files && Array.from(files);

  console.log(images);

  const handleCreateProduct = () => {
    // const newProduct = {
    //   title: "Test 10",
    //   description: "Lorem ipsum dolor",
    //   price: 300,
    //   categoryId: "1",
    //   stock : 10,
    // }

    const formData = new FormData();

    formData.append("title", "Test 11");
    formData.append("description", "Lorem ipsum dolor emet");
    formData.append("price", "300");
    formData.append("categoryId", "1");
    formData.append("stock", "5");

    images?.forEach((item: File) => formData.append("images", item));

    api.post("product", formData);
  };
  return (
    <section className="p-3">
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        multiple
        accept="image/*"
      />
      <div>
        {images?.map((item: File, inx: number) => (
          <img key={inx} src={URL.createObjectURL(item)} width={200} alt="" />
        ))}
      </div>

      <div className="flex justify-end my-2">
        <Button onClick={handleCreateProduct}>Add Product</Button>
      </div>
    </section>
  );
};

export default memo(ProductsTab);
