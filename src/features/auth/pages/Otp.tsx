import { Button, Input, type GetProps } from "antd";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useAuth } from "../service/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { setKey } from "../store/authSlice";

type OTPProps = GetProps<typeof Input.OTP>;

const Otp = () => {
  const {key, user} = useSelector((state: RootState) => state.auth)
  const {confirmOtp,sendNewOtp} = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange: OTPProps["onChange"] = (text) => {
    const body = {otp:text, verificationKey:key, email: user.email }
   confirmOtp.mutate(body, {
    onSuccess: () => {
      navigate("/login")
    }
   });
  };
  const {error, isError, isPending} = confirmOtp

  const handleSendOtp = () => {
    sendNewOtp.mutate({email: user.email}, {
      onSuccess: (res) => {
        dispatch(setKey(res.verificationKey))
      }
    })
  }

  if(!user){
    return <Navigate replace to={"/register"}/>
  }
  
  return (
    <div className="bg-slate-100 h-screen grid place-items-center">
      <div className="max-w-[450px] w-full bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Enter verification code</h2>
        <p className="mb-4">{user?.email}</p>
        <Input.OTP disabled={isPending} formatter={(str) => str.toUpperCase()} onChange={onChange} />
        <Button onClick={handleSendOtp} className="mt-4">Send OTP</Button>
        {
          isError &&
          <p className="text-center text-red-500 mt-4 text-sm">{error?.response?.data?.message}</p>
        }
      </div>
    </div>
  );
};

export default memo(Otp);
