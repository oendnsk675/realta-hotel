"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const router = useRouter();

  let ormeid = params.id.split("-");

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Ambil cartItems dari localStorage saat halaman dimuat
    const storedCartItems = localStorage.getItem("cartItems");

    // Periksa apakah ada data yang tersimpan di localStorage
    if (storedCartItems) {
      // Jika ada, parse data dari string ke array
      const parsedCartItems = JSON.parse(storedCartItems);

      // Set cartItems dengan nilai yang diambil dari localStorage
      setCartItems(parsedCartItems);
    }
  }, []);

  const [submitting, setIsSubmitting] = useState(false);

  const [information, setInformation] = useState({
    ormeOrderDate: new Date(),
    ormeTotalItem: ormeid.length,
    ormeTotalDiscount: "0",
    ormeTotalAmount: "",
    ormePayType: "Pay_at_hotel",
    ormeCardnumber: "",
    ormeIsPaid: "Y",
    ormeModifiedDate: new Date(),
    ormeUserId: 1,
    orderDetails: ormeid,
  });

  const submitInformation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    var raw = JSON.stringify(information);

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:3002/order-menus",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));

    if (response) {
      router.push(`/resto/bill/${response.ormeId}`);
    }

    setIsSubmitting(false);
  };

  const handleTypeChange = (event) => {
    setInformation((prevMenu) => ({
      ...prevMenu,
      ormePayType: event.target.value,
    }));
  };

  // Fungsi untuk menghitung total pesanan (order total)
  const calculateOrderTotal = () => {
    const orderTotal = cartItems.reduce((total, item) => {
      const itemTotal =
        removeCurrencyFormatting(item.remePrice) * item.quantity; // Menghitung total harga per item
      return total + itemTotal; // Menjumlahkan total harga item dengan total sebelumnya
    }, 0);

    return orderTotal;
  };

  const removeCurrencyFormatting = (amount) => {
    // Hapus karakter "Rp"
    let result = amount.replace("Rp", "");

    // Hapus tanda titik pada ribuan
    result = result.replace(/\./g, "");

    // Mengembalikan nilai sebagai angka
    return parseInt(result);
  };

  // Fungsi untuk mengubah angka menjadi format uang Rupiah
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
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
        <h1 className="text-2xl">Complete Your Order</h1>
      </div>
      <form onSubmit={submitInformation}>
        {/* content */}
        <div className="flex gap-4 w-full mt-10">
          {/* card container */}
          <div className="w-[78%] pl-8">
            <span className="px-2 py-4 w-full block text-xl border-2">
              1. Enter your details
            </span>
            <div className="px-2 mt-6">
              <span className="font-bold">
                We will use these details to share your booking information
              </span>

              <div className="flex items-center w-full mt-6">
                <div className="w-[48%]">
                  <label className="block" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="rounded-md w-80 p-1 px-2 border"
                    placeholder="Enter first and last name"
                  />
                </div>

                <div className="w-[48%]">
                  <label className="block" htmlFor="name">
                    Email
                  </label>
                  <input
                    type="email"
                    className="rounded-md w-80 p-1 px-2 border"
                    placeholder="name@mail.com"
                  />
                </div>
              </div>

              <div className="flex items-center w-full mt-6">
                <div className="w-[48%]">
                  <label className="block" htmlFor="name">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    className="rounded-md w-80 p-1 px-2 border"
                    placeholder="6281917xxxxxx"
                  />
                </div>
              </div>
            </div>

            {/* 2 payment */}
            <span className="px-2 py-4 w-full block text-xl border-2 mt-12">
              2. Payment
            </span>

            <div className="flex items-center w-full mt-6">
              <div className="w-[48%]">
                <label className="block" htmlFor="type">
                  Type
                </label>
                <select
                  onChange={handleTypeChange}
                  value={information.ormePayType}
                  className="rounded-md w-80 p-1 px-2 border"
                  id="type"
                >
                  <option value="Pay_at_hotel">Pay at Hotel</option>
                  <option value="Goto">Go To</option>
                </select>
              </div>

              <div className="w-[48%]">
                <label className="block" htmlFor="account_payment">
                  Account Payment
                </label>
                <input
                  value={information.ormeCardnumber}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      ormeCardnumber: e.target.value,
                    })
                  }
                  id="account_payment"
                  type="number"
                  className="rounded-md w-80 p-1 px-2 border"
                  placeholder="11125xxxx"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 mt-4 bg-indigo-200 border">
              <span>Your account valid, please continue to complete</span>
              <button className="px-5 py-1 text-xs bg-indigo-400 rounded-md text-white">
                Validate
              </button>
            </div>
          </div>

          {/* order container */}
          <div className="w-[22%] h-full border">
            <div className="flex items-center border-b p-2 px-4 gap-4 mb-5">
              <span className="text-sm">Items Ordered</span>
            </div>

            {/* list item ordered */}
            <div className="flex border-b flex-col gap px-2 pb-2">
              {cartItems.map((item) => (
                <div className="">
                  <span className="font-bold">{item.remeName}</span>
                  <div className="flex items-center justify-between">
                    <span className="ml-5 text-xs">
                      {formatCurrency(removeCurrencyFormatting(item.remePrice))}{" "}
                      x {item.quantity} ={" "}
                      {formatCurrency(
                        removeCurrencyFormatting(item.remePrice) * item.quantity
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* subtotal */}
            <div className="mt-4 px-2 pb-3">
              <div className="flex text-sm items-center">
                <span className="w-28">Subtotal</span>
                <span className="">
                  {formatCurrency(calculateOrderTotal())}
                </span>
              </div>

              <h2 className="text-lg my-4">
                Total {formatCurrency(calculateOrderTotal())}
              </h2>
              <button className="px-5 py-3 text-xs w-full hover:opacity-60 my-2 border-2 border-primary-orange rounded-md text-gray-600">
                Get Coupons
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-3 text-xs block text-center w-full hover:opacity-60 bg-primary-orange rounded-md text-white"
              >
                Complete Your Request
              </button>

              <span className="text-xs block mt-3">
                Your order will be send to your room 102
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
