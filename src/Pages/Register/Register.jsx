import axios from 'axios';
import { Button, Card, Label, TextInput, Radio } from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [showPin, setShowPin] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    axios.post(`${import.meta.env.VITE_API_ADDRESS}/register`, data).then(res => {
      if (res.data.acknowledged) {
        console.log(res.data);
        toast.success('Registration successful. Now you can login.');
        // window.location.href = '/login';
      } else if (res.data.message) {
        toast.error(`${res.data.message}`);
      }
    });
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2 place-items-center">
      <div className="w-full px-5 h-full flex items-center justify-center">
        <Card className="max-w-[400px] w-full  backdrop-blur-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput {...register('email', { required: true })} id="email1" type="email" placeholder="name@demo.com" />
              {errors.email?.type === 'required' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Email Required
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Your Phone" />
              </div>
              <TextInput
                {...register('phone', { required: true, minLength: 8, maxLength: 12 })}
                id="phone"
                type="number"
                placeholder="Enter your phone number"
              />
              {errors.phone?.type === 'required' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Phone Number Required
                </p>
              )}
              {errors.phone?.type === 'minLength' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Phone Number Should be 8-12 Digits
                </p>
              )}
              {errors.phone?.type === 'maxLength' && (
                <p className="text-[14px] text-red-600 mt-2" role="alert">
                  Phone Number Should be 8-12 Digits
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
                  Please Enter Number Only
                </p>
              )}
            </div>
            <div>
              <fieldset className="flex max-w-md flex-row my-4 gap-4">
                <div className="flex items-center gap-2">
                  <Radio {...register('role', { required: true })} id="user" name="role" value="user" />
                  <Label htmlFor="user">User</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio {...register('role', { required: true })} id="agent" name="role" value="agent" />
                  <Label htmlFor="agent">Agent</Label>
                </div>
                <span>
                  {errors.role?.type === 'required' && (
                    <p className="text-[14px] text-red-600 " role="alert">
                      Please select a role
                    </p>
                  )}
                </span>
              </fieldset>
            </div>
            <Button type="submit">Register</Button>
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

export default Register;
