"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@app/admin/layout";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const [menu, setMenu] = useState([]);

  const [search, setSearch] = useState("");

  const [popupStatus, setPopupStatus] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const togglePopup = (itemId) => {
    setPopupStatus((prevStatus) => {
      const newStatus = { ...prevStatus };

      // Menutup semua popup yang terbuka
      Object.keys(newStatus).forEach((key) => {
        newStatus[key] = false;
      });

      // Toggle status popup item yang diklik
      newStatus[itemId] = !prevStatus[itemId];

      return newStatus;
    });
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

  const handleChangeSearch = async (e) => {
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

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex-end w-full">
        <div className="flex gap-2 items-center">
          <span>Search Menu</span>
          <form
            onSubmit={handleChangeSearch}
            className="flex gap-2 items-center"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md w-80 p-1 px-2 border"
              placeholder="Type here"
            />
            <input
              type="submit"
              value={"Search"}
              className="px-5 py-1 text-sm bg-primary-orange rounded-md text-white"
            />
          </form>
        </div>
      </div>

      {/* table */}
      <div className="rounded-lg border mt-5 p-5">
        <table className="w-full h-full">
          <thead className="">
            <tr>
              <th></th>
              <th className="text-start">Id</th>
              <th className="w-[45%] text-start">Menu Name</th>
              <th className="text-start">Price</th>
              <th className="text-start">Type</th>
              <th className="text-start">Status</th>
              <th className="w-[3%] text-start">
                <Link
                  href={"/admin/menu/add"}
                  className="px-5 py-1 text-sm bg-primary-orange rounded-md text-white"
                >
                  Add
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {menu.map((m, index) => (
              <tr>
                <td className="pt-4"></td>
                <td className="pt-4">{index + 1}</td>
                <td className="pt-4">{m.remeName}</td>
                <td className="pt-4">{m.remePrice}</td>
                <td className="pt-4">{m.remeType}</td>
                <td className="pt-4">{m.remeStatus}</td>
                <td className="flex-center relative pt-4">
                  <button>
                    <Image
                      src="/dot.svg"
                      alt="logo"
                      width={21}
                      height={21}
                      className="object-contain"
                      onClick={() => togglePopup(m.remeId)}
                    />
                  </button>
                  {popupStatus[m.remeId] && (
                    <div className="absolute z-30 top-[2.5rem] right-6 w-32 border bg-indigo-100 rounded-lg">
                      <div className="p-2 hover:opacity-70 transition-all duration-300">
                        <Link
                          className="w-full"
                          href={`/admin/menu/edit/${m.remeId}`}
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="pb-2 px-2  hover:opacity-70 transition-all duration-300">
                        <Link className="w-full" href={"/admin/menu/photos"}>
                          Upload Photos
                        </Link>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default page;
