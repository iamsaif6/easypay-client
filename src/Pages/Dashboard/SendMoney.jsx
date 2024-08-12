import { TbCurrencyTaka } from 'react-icons/tb';
import Heading from '../../components/Heading';
import { useForm } from 'react-hook-form';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [fees, setFees] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [showPin, setShowPin] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const userInfo = localStorage.getItem('userInfo');

  // hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchAmount = Number(watch('amount'));

  //change amount when the user type the amount in field
  useEffect(() => {
    setAmount(watchAmount);
    //charge 5 tk if the amount is more than 100
    if (amount > 100) {
      setFees(5);
    } else {
      setFees(0);
    }
    //Add the payment fee to total payment
    if (amount > 100) {
      setFinalAmount(amount + Number(fees));
    } else {
      setFinalAmount(0);
    }
  }, [watchAmount, amount, fees]);

  //Submit send money form
  const onSubmit = data => {
    data.amount = Number(finalAmount);
    data.userInfo = userInfo;
    data.type = 'send';

    //Check if user trying to send money to own account

    Swal.fire({
      title: 'Please Confirm !',
      text: `BDT ${finalAmount} will be deducted from your account`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#489D72',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Send!',
    }).then(result => {
      if (result.isConfirmed) {
        // Send money request to api
        axiosPrivate.post('/send-money', data).then(res => {
          if (res.data.code === 402) {
            Swal.fire({
              title: `${res.data.message}`,
              text: 'Authentication failed.',
              icon: 'error',
            });
          } else if (res.data.code === 401) {
            Swal.fire({
              title: `${res.data.message}`,
              text: 'Authentication failed.',
              icon: 'error',
            });
          } else if (res.data.code === 403) {
            Swal.fire({
              title: `${res.data.message}`,
              text: 'You dont have enough balance !',
              icon: 'error',
            });
          } else if (res.data.code === 404) {
            Swal.fire({
              title: `${res.data.message}`,
              text: 'Please contact to admin !',
              icon: 'error',
            });
          } else if (res.data.code === 405) {
            Swal.fire({
              title: `${res.data.message}`,
              text: 'Please try another account!',
              icon: 'error',
            });
          } else if (res.data.code === 406) {
            Swal.fire({
              title: `${res.data.message}`,
              text: 'Please contact to admin!',
              icon: 'error',
            });
          }
        });
      }
    });
    console.log(data);
  };

  return (
    <div>
      {/* <Heading text="Send Money"></Heading> */}
      <div className="bg-white max-w-lg mx-auto border rounded-lg">
        <h2 className="text-[24px] text-[#333]  font-bold p-6 border-b">Personal Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-[#666]">
          <label className="block mb-2 uppercase text-[#A0AAB7] font-semibold text-[14px]" htmlFor="email">
            recipient
          </label>
          <input
            {...register('receiver_email', { required: true })}
            placeholder="Enter recipient email or phone"
            className="rounded-md py-3 px-5 focus-visible:border-[#ff6817a4] w-full placeholder:text-[#d5d5d5] border-[#E0E3E7]"
            id="email"
            type="text"
          />
          {errors.receiver_email?.type === 'required' && (
            <p className="text-[14px] text-red-600 mt-2" role="alert">
              Phone Number or email Required
            </p>
          )}
          <div className="my-5">
            <label className="block mb-2 uppercase text-[#A0AAB7] font-semibold text-[14px]" htmlFor="amount">
              Enter amount
            </label>
            <div className="relative">
              <input
                {...register('amount', { required: true, min: 50 })}
                placeholder="BDT"
                className="rounded-md py-3 px-5 pl-16 focus-visible:border-[#ff6817a4] w-full placeholder:text-[#d5d5d5] border-[#E0E3E7]"
                id="amount"
                type="number"
              />
              <span className="absolute border-[#E0E3E7] border-r-transparent border flex justify-center items-center px-4 rounded-tl-md rounded-bl-md text-[20px] text-[#a3a4a5] left-0 top-1/2 -translate-y-1/2 h-full bg-[#F3F5F6]">
                <TbCurrencyTaka />
              </span>
            </div>
            {errors.amount?.type === 'min' && (
              <p className="text-[14px] text-red-600 mt-2" role="alert">
                Minimun amount is BDT 50
              </p>
            )}
          </div>
          <div className="mb-7">
            <div className="mb-2 block">
              <label className="block mb-2 uppercase text-[#A0AAB7] font-semibold text-[14px]" htmlFor="amount">
                Enter PIN
              </label>
            </div>
            <div className="relative">
              <input
                className="rounded-md py-3 px-5  focus-visible:border-[#ff6817a4] w-full placeholder:text-[#d5d5d5] border-[#E0E3E7]"
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
          <div className="flex  text-[14px] mb-5 border-b pb-5 font-semibold justify-between">
            <p className="text-[#A0AAB7]">Total Fees</p>
            <p>{fees} BDT</p>
          </div>
          <div className="flex text-[#222] text-[16px] mb-5 border-b pb-5 font-semibold justify-between">
            <p>Total to Pay</p>
            <p>{finalAmount} BDT</p>
          </div>
          <button className="flex justify-center hover:gap-4 gap-3 text-white py-3 font-bold hover:bg-green-500 transition-all rounded-md w-full bg-[#ff6817]">
            Send <IoIosSend className="text-[22px]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
