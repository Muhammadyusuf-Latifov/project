import { memo } from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input } from "antd";
import { useAuth } from "../service/useAuth";
import { useDispatch } from "react-redux";
import { setKey, setUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
  fname: string;
  lname?: string;
  address?: string;
};

const Register = () => {
  const { signUp } = useAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    signUp.mutate(values, {
      onSuccess: (res) => {
        dispatch(setUser(values))
        dispatch(setKey(res.verificationKey))
        navigate("/otp")
      }
    })
  };

  const message = signUp.error?.response?.data?.message 

  const errorMessage =
    typeof message === "string"
      ? message
      : message?.map((i: string, inx: number) => <p key={inx}>{i}</p>);

  return (
    <div className="bg-slate-100 h-screen grid place-items-center">
      <div className="max-w-[450px] w-full bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="First name"
            name="fname"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Last name"
            name="lname"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {signUp.isError && (
            <div className="mb-6">
              <Alert message={errorMessage} type="error" />
            </div>
          )}
          <Form.Item label={null}>
            <Button loading={signUp.isPending} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Link to={"/login"}>Login</Link>
        </Form>
      </div>
    </div>
  );
};

export default memo(Register);
