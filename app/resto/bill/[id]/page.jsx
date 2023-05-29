"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  useEffect(() => {
    fetchData();
  }, []);

  const [orderMenu, setOrderMenu] = useState(null);
  const [orderMenuDetail, setOrderMenuDetail] = useState([]);

  const fetchData = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    await fetch(
      `http://localhost:3002/order-menus/${params.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setOrderMenu(data.order_menu);
        setOrderMenuDetail(data.order_menu_detail);
      })
      .catch((error) => console.log("error", error));
  };

  // Fungsi untuk mengubah angka menjadi format uang Rupiah
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  };

  const removeCurrencyFormatting = (amount) => {
    console.log(amount);
    // Hapus karakter "Rp"
    let result = amount.replace("Rp", "");

    // Hapus tanda titik pada ribuan
    result = result.replace(/\./g, "");

    // Mengembalikan nilai sebagai angka
    return parseInt(result);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Link className="hover:opacity-60" href={"/resto/menu"}>
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
            <span className="text-sm">
              Order Number :
              {!orderMenu ? <span>Loading...</span> : orderMenu.ormeOrderNumber}
            </span>
            <span className="text-sm">Include Number : FQ-231333312</span>
            <span className="text-sm">
              Payment Type :{" "}
              {!orderMenu ? <span>Loading...</span> : orderMenu.ormePayType}
            </span>
            <span className="text-sm">Deliver to room : 103</span>
          </div>

          {/* list item ordered */}
          <div className="flex border-b flex-col gap px-2 pb-2">
            {!orderMenuDetail
              ? "Loading"
              : orderMenuDetail.map((el) => (
                  <div className="">
                    <span className="font-bold">{el.omdeReme.remeName}</span>
                    <div className="flex items-center justify-between">
                      <span className="ml-5">
                        {el.omdeReme.remePrice} x {el.ormeQty} ={" "}
                        {formatCurrency(
                          removeCurrencyFormatting(el.omdeReme.remePrice) *
                            el.ormeQty
                        )}
                      </span>
                    </div>
                  </div>
                ))}
          </div>

          {/* subtotal */}
          <div className="mt-4 px-2 pb-3">
            <h2 className="text-lg my-4">
              Total{" "}
              {!orderMenu ? <span>Loading...</span> : orderMenu.ormeTotalAmount}
            </h2>
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
