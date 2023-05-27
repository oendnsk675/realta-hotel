import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Link className="hover:opacity-60" href={"/resto/order"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="transform rotate-180"
          >
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
          </svg>
        </Link>
        <h1 className="text-2xl">Bill</h1>
      </div>

      {/* content */}
      <div className="flex justify-center gap-4 w-full mt-10">
        {/* order container */}
        <div className="w-[22%] h-full border">
          <div className="flex items-center border-b p-2 px-4 gap-4 mb-5">
            <span className="text-sm">Items Ordered</span>
          </div>

          <div className="flex flex-col border-b p-2 px-4 gap-2 mb-5">
            <span className="text-xl text-center mb-2">Hotel Realta</span>
            <span className="text-sm">Order Number : FQ-231333312</span>
            <span className="text-sm">Include Number : FQ-231333312</span>
            <span className="text-sm">Payment Type : Goto</span>
            <span className="text-sm">Deliver to room : 103</span>
          </div>

          {/* list item ordered */}
          <div className="flex border-b flex-col gap px-2 pb-2">
            <div className="">
              <span className="font-bold">Sop iga kambing</span>
              <div className="flex items-center justify-between">
                <span className="ml-5">Rp65.000 x 1 = 65.000</span>
              </div>
            </div>
          </div>

          {/* subtotal */}
          <div className="mt-4 px-2 pb-3">
            <div className="flex text-sm items-center">
              <span className="w-28">Subtotal</span>
              <span className="">Rp 20.000</span>
            </div>
            <div className="flex text-sm items-center">
              <span className="w-28">Tax</span>
              <span className="">10%</span>
            </div>

            <h2 className="text-lg my-4">Total Rp. 247.0000</h2>
            <span className="text-xs mt-3 text-center w-full block">
              Thank you & enjoy your foods
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
