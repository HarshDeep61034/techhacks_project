import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
const CheckoutPage = () => {
  const { price } = useParams();
  return (
    <div className="w-screen h-screen flex jutify-center items-center">
      <div className="border border-black border-2 mx-auto rounded-lg p-10 text-[35px]">
        <div className="flex flex-col items-center my-2">
          <RiVerifiedBadgeFill className="text-green-600 font-bold animate-spin" />
        </div>
        <div className="text-center my-2">${price}</div>
        <div className="my-2">Received Successfully</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
