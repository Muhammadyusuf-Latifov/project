import { memo, useState } from "react";
import { useAuth } from "../../auth/service/useAuth";
import { Button, Input, Modal, Form } from "antd";
import { useProfile } from "../service/useProfile";
import meImage from "../../../shared/assets/user.png"
const Profile = () => {
  const { getProfile } = useAuth();
  const { data } = getProfile();
  const me = data?.data;

  const [form] = Form.useForm();
  const { updateProfile } = useProfile();
  const { mutate } = updateProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(data);

  const handleCancel = () => setIsModalOpen(false);

  const setEdit = () => {
    form.setFieldsValue({
      fname: me?.fname,
      lname: me?.lname,
      address: me?.address,
    });
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    mutate({ id: me?.id, ...values });
    setIsModalOpen(false);
    console.log("Updated values:", values);
  };

  return (
    <div className="Profile">
      <div className="flex items-center justify-between mb-[100px] px-[30px]">
        <h2 className="text-[28px] text-[#094d90]">Profile</h2>
        <Button type="primary" onClick={setEdit}>
          Update
        </Button>
      </div>

      <div className="w-full  flex items-center justify-center">
        <div className="w-[300px] bg-gray-200 shadow-lg border border-[#ddd] rounded-[6px] overflow-hidden ">
          <div>
            <img src={meImage} alt="" />
          </div>
          <div className="p-[16px]">
            <h2 className="text-[18px] font-medium text-[dodgerblue]">
              {me?.fname}
            </h2>
            <p className="text-[dodgerblue] text-[18px] font-medium">
              {me?.lname}
            </p>
            <p className="text-[#0290b7]">{me?.address ? me?.address : "yashash joyi kiritilmagan"}</p>
          </div>
        </div>
      </div>

      <Modal
        title="Update Profile"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="First name"
            name="fname"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lname"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-[30px]">
            <Button onClick={handleCancel} danger>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(Profile);
