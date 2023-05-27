"use client";

import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [cartItems, setCartItems] = useState([]);

  const isCartEmpty = cartItems.length === 0;

  // Fungsi untuk mengubah angka menjadi format uang Rupiah
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Jika item sudah ada di dalam cart, update jumlahnya
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      // Jika item belum ada di dalam cart, tambahkan sebagai item baru
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Fungsi untuk menghitung total pesanan (order total)
  const calculateOrderTotal = () => {
    const orderTotal = cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity; // Menghitung total harga per item
      return total + itemTotal; // Menjumlahkan total harga item dengan total sebelumnya
    }, 0);

    return orderTotal;
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="w-full">
      {/* search */}
      <div className="flex-end w-full">
        <div className="flex gap-2 items-center">
          <span>Search Menu</span>
          <form className="flex gap-2 items-center">
            <input
              type="text"
              className="rounded-md w-80 p-1 px-2 border"
              placeholder="Type here"
            />
          </form>
        </div>
      </div>

      {/* content */}
      <div className="flex gap-4 w-full mt-10">
        {/* card container */}
        <div className="w-[80%] flex flex-wrap gap-4">
          <div className="w-[20%] p-2 max-h-96 rounded-md border">
            <div className="w-full h-40 bg-black rounded object-cover"></div>
            <h1 className="text-xl font-bold mt-2">Sop Iga</h1>
            <span className="text-xs text-opacity-30">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus, quae?
            </span>
            <span className="mt-4 p-0.5 px-2 text-xs block w-fit rounded-full bg-blue-100">
              available
            </span>
            <div className="flex justify-between items-end">
              <span className="text-sm">Rp65.000</span>
              <span className="text-xs text-opacity-30">include tax</span>
            </div>
            <div className="w-full flex justify-end mt-1">
              <button
                onClick={() =>
                  addToCart({ id: 1, name: "Product A", price: 10000 })
                }
                className="px-5 py-1 text-xs bg-primary-orange rounded-md text-white"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* order container */}
        <div className="w-[23%] h-full border">
          <div className="flex items-center border-b p-2 px-4 gap-4 mb-5">
            <span className="text-sm">Items Ordered</span>
          </div>

          {/* list item ordered */}
          {!isCartEmpty && (
            <div>
              <div className="flex border-b flex-col gap px-2 pb-2">
                {cartItems.map((item) => (
                  <div className="">
                    <span className="font-bold">Sop iga kambing</span>
                    <div className="flex items-center justify-between">
                      <span className="ml-5 text-xs">
                        {formatCurrency(item.price)} x {item.quantity} ={" "}
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hover:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* subtotal */}
              <div className="mt-4 px-2 pb-3">
                <div className="flex text-sm items-center">
                  <span className="w-28">Subtotal</span>
                  <span className="">Rp 20.000</span>
                </div>

                <h2 className="text-sm my-4">
                  Total {formatCurrency(calculateOrderTotal())}
                </h2>
                <Link
                  href={"/resto/order"}
                  className="px-5 py-3 text-xs block mb-2 text-center w-full hover:opacity-60 bg-primary-orange rounded-md text-white"
                >
                  Create Order
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
