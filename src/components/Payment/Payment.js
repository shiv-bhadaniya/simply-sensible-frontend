import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import * as API from "../../API/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { createOrder } from "../../slices/user/order";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [isPaymentProccessing, setPaymentProccessing] = useState(0);
  const navigate = useNavigate();
  const payBtn = useRef(null);

  var { cartPriceWithFinalAmountFromServer } = useSelector(
    (state) => state.cartPriceFromServer,
  );
  console.log(cartPriceWithFinalAmountFromServer);
  if (
    cartPriceWithFinalAmountFromServer &&
    typeof cartPriceWithFinalAmountFromServer !== "number"
  ) {
    navigate("/shop");
  }

  var { cartItems, shipingInfo } = useSelector((state) => state.cart);
  var { data } = useSelector((state) => state.authUser);
  var user = data?.result;
  // stripe accept paisa. convert rs to paisa
  var paymentAmountInPaisa = {
    amount: Math.round(cartPriceWithFinalAmountFromServer * 100),
  };

  const myOrder = {
    shipingInfo,
    orderItems: cartItems,
    totalAmount: cartPriceWithFinalAmountFromServer,
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    setPaymentProccessing(1);
    try {
      const { data } = await API.paymentProcess(paymentAmountInPaisa);
      console.log("data from server client_Scret : ", data);
      const client_secret = data?.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            phone: shipingInfo.phoneNo,
            address: {
              line1: shipingInfo.address,
              city: shipingInfo.city,
              state: shipingInfo.state,
              postal_code: shipingInfo.pincode,
              country: shipingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // create order here and dispatch with all details like oayment id and all that stuffff.
          console.log("Paymnet success. ", result);
          let rs = result.paymentIntent.amount;
          rs = rs / 100;
          myOrder.paymetInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            amount: rs,
            currency: result.paymentIntent.currency,
          };
          toast.success("Payment Successfully done.", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          dispatch(createOrder(myOrder, navigate));
        } else {
          payBtn.current.disabled = false;
          toast.error("Some error while payment.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div class="antialiased text-gray-600 min-h-screen p-4 mt-6 pt-12">
        <div class="h-full">
          <div
            class="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto"
            x-data="{ card: true }"
          >
            <div class="bg-white px-8 pb-6 rounded-b shadow-lg">
              <div class="grid place-items-center pt-7 font-mono text-2xl font-semibold">
                {" "}
                Card Info{" "}
              </div>

              <div x-show="card">
                <div class="space-y-4 pt-7">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="card-nr">
                      Card Number <span class="text-red-500">*</span>
                    </label>
                    <CardNumberElement className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" />
                  </div>

                  <div class="flex-1">
                    <label
                      class="block text-sm font-medium mb-1"
                      for="card-expiry"
                    >
                      Expiry Date <span class="text-red-500">*</span>
                    </label>
                    <CardExpiryElement className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" />
                  </div>
                  <div class="flex-1">
                    <label
                      class="block text-sm font-medium mb-1"
                      for="card-cvc"
                    >
                      CVC <span class="text-red-500">*</span>
                    </label>
                    <CardCvcElement className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" />
                  </div>

                  <div class="mt-6">
                    <div class="mb-4">
                      {isPaymentProccessing ? (
                        <div
                          disabled
                          type="button"
                          class="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        >
                          <svg
                            role="status"
                            class="inline mr-3 w-4 h-4 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      ) : (
                        <button
                          ref={payBtn}
                          type="submit"
                          onClick={handlePaymentSubmit}
                          class="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        >
                          Pay &nbsp; &#8377;{" "}
                          {cartPriceWithFinalAmountFromServer}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
