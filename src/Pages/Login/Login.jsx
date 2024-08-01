import axios from 'axios';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  //Check if the user is already loggedin
  const [data, isPending] = useAuth();

  const [showPin, setShowPin] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    // console.log(data);
    axios.post(`${import.meta.env.VITE_API_ADDRESS}/login`, data).then(res => {
      if (res.data.token) {
        //set tokens to local storage on  successful login
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userInfo', res.data.user);
        localStorage.setItem('secret', res.data.secret);
        toast.success('Login successful!');
      } else {
        console.log(res.data);
        toast.error(res.data.message);
      }
    });
  };

  // if user already loggedin do this
  if (!isPending && data?.isVerified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2 place-items-center">
      <div className="w-full px-5 h-full flex items-center justify-center">
        <Card className="max-w-[400px] w-full  backdrop-blur-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Your email or phone" />
              </div>
              <TextInput {...register('username', { required: true })} id="username" type="text" placeholder="Enter your email or phone" />
              {errors.username?.type === 'required' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Enter email or phone number
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your PIN" />
              </div>
              <div className="relative">
                <TextInput
                  placeholder="Enter 5 digit PIN"
                  {...register('pin', { required: true, minLength: 5, maxLength: 5, pattern: /^\d+$/ })}
                  id="password1"
                  type={showPin ? 'text' : 'password'}
                />
                <span
                  onClick={() => {
                    setShowPin(!showPin);
                  }}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2"
                >
                  {showPin ? <FaEye className="text-[20px] text-primary" /> : <FaEyeSlash className="text-[20px] text-gray-400" />}
                </span>
              </div>
              {errors.pin?.type === 'required' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  5 Digit PIN Required
                </p>
              )}
              {errors.pin?.type === 'maxLength' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Please Enter 5 Digit PIN
                </p>
              )}{' '}
              {errors.pin?.type === 'minLength' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Please Enter 5 Digit PIN
                </p>
              )}
              {errors.pin?.type === 'pattern' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  PIN shoule be number only
                </p>
              )}
            </div>
            <Button type="submit">Login</Button>
          </form>
        </Card>
      </div>
      <div className="w-full hidden  md:flex px-7 items-center flex-col text-center justify-center h-full bg-[#222]">
        <h1 className="text-white text-[45px] font-semibold text-center">
          Welcome To <span className="text-primary font-extrablod">EasyPay </span> ! Join Now For Seamless Payments
        </h1>
        <p className="text-white opacity-70 text-[15px] mt-4 font-light">
          EasyPay is an online banking payment system enabling secure and convenient transactions, fund transfers, and account management
          from any internet-connected device.
        </p>
      </div>
    </div>
  );
};

export default Login;
