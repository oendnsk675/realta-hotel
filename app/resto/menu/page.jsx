"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [menu, setMenu] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [submitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

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
    const existingItem = cartItems.find(
      (cartItem) => cartItem.remeId === item.remeId
    );

    if (existingItem) {
      // Jika item sudah ada di dalam cart, update jumlahnya
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.remeId === item.remeId) {
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

  const [search, setSearch] = useState("");

  const handleChangeSearch = async (e) => {
    setSearch(e.target.value);
    e.preventDefault();

    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    await fetch(
      `http://localhost:3002/resto-menus/search?name=${search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.log("error", error));
  };

  const removeCurrencyFormatting = (amount) => {
    // Hapus karakter "Rp"
    let result = amount.replace("Rp", "");

    // Hapus tanda titik pada ribuan
    result = result.replace(/\./g, "");

    // Mengembalikan nilai sebagai angka
    return parseInt(result);
  };

  const fetchData = async () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    await fetch("http://localhost:3002/resto-menus", requestOptions)
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.log("error", error));
  };

  const createOrder = async () => {
    setIsSubmitting(true);
    try {
      let data = { ...cartItems, subtotal: calculateOrderTotal() };
      const response = await fetch("http://localhost:3002/order-menu-detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      const omdeIds = await result.map(
        (orderMenuDetail) => orderMenuDetail.omdeId
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // console.log(omdeIds);

      if (response.ok) {
        router.push(`/resto/order/${omdeIds.join("-")}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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

  const removeFromCart = (itemId) => {
    console.log(itemId);
    const updatedCartItems = cartItems.map((item) => {
      if (item.remeId === itemId) {
        // Jika item id cocok dengan itemId yang ingin dihapus
        if (item.quantity > 1) {
          // Jika quantity lebih dari 1, kurangi quantity-nya
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Jika quantity sama dengan 1, hapus item dari keranjang
          return null;
        }
      }
      return item;
    });

    // Hapus item dengan quantity 0 dari keranjang
    const filteredCartItems = updatedCartItems.filter((item) => item !== null);

    setCartItems(filteredCartItems);
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
              value={search}
              onChange={handleChangeSearch}
            />
          </form>
        </div>
      </div>

      {/* content */}
      <div className="flex gap-4 w-full mt-10">
        {/* card container */}
        <div className="w-[80%] flex flex-wrap gap-4">
          {menu.map((data) => (
            <div className="w-[20%] p-2 max-h-96 rounded-md border">
              <div className="w-full h-40 bg-black rounded object-cover"></div>
              <h1 className="text-xl font-bold mt-2">{data.remeName}</h1>
              <span className="text-xs text-opacity-30">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus, quae?
              </span>
              <span className="mt-4 p-0.5 px-2 text-xs block w-fit rounded-full bg-blue-100">
                {data.remeStatus}
              </span>
              <div className="flex justify-between items-end">
                <span className="text-sm">{data.remePrice}</span>
                <span className="text-xs text-opacity-30">include tax</span>
              </div>
              <div className="w-full flex justify-end mt-1">
                <button
                  onClick={() => addToCart(data)}
                  className="px-5 py-1 text-xs bg-primary-orange rounded-md text-white"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* order container */}
        <div className="w-[20%] h-full border">
          <div className="flex items-center border-b p-2 px-4 gap-4 mb-5">
            <span className="text-sm">Items Ordered</span>
          </div>

          {/* list item ordered */}
          {!isCartEmpty && (
            <div>
              <div className="flex border-b flex-col gap px-2 pb-2">
                {cartItems.map((item) => (
                  <div className="">
                    <span className="font-bold">{item.remeName}</span>
                    <div className="flex items-center justify-between">
                      <span className="ml-5 text-xs">
                        {formatCurrency(
                          removeCurrencyFormatting(item.remePrice)
                        )}{" "}
                        x {item.quantity} ={" "}
                        {formatCurrency(
                          removeCurrencyFormatting(item.remePrice) *
                            item.quantity
                        )}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.remeId)}
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
                  <span className="">
                    {formatCurrency(calculateOrderTotal())}
                  </span>
                </div>

                <h2 className="text-sm my-4">
                  Total {formatCurrency(calculateOrderTotal())}
                </h2>
                <button
                  onClick={createOrder}
                  className="px-5 py-3 text-xs block mb-2 text-center w-full hover:opacity-60 bg-primary-orange rounded-md text-white"
                >
                  Create Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
