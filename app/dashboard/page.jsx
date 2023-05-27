"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@app/dashboard/layout";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const [toggleDropdown, setToggleDropdown] = useState(null);

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex-end w-full">
        <div className="flex gap-2 items-center">
          <span>Search Menu</span>
          <form className="flex gap-2 items-center">
            <input
              type="text"
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
                  href={"/dashboard/menu/add"}
                  className="px-5 py-1 text-sm bg-primary-orange rounded-md text-white"
                >
                  Add
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-4"></td>
              <td className="pt-4">1</td>
              <td className="pt-4">Fried</td>
              <td className="pt-4">12003</td>
              <td className="pt-4">Snack</td>
              <td className="pt-4">Available</td>
              <td className="flex-center relative pt-4">
                <button>
                  <Image
                    src="/dot.svg"
                    alt="logo"
                    width={21}
                    height={21}
                    className="object-contain"
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                  />
                </button>
                {toggleDropdown && (
                  <div className="absolute top-6 right-6 w-32 border bg-indigo-100 rounded-lg">
                    <div className="p-2 hover:opacity-70 transition-all duration-300">
                      <Link className="w-full" href={"/dashboard/menu/edit"}>
                        Edit
                      </Link>
                    </div>
                    <div className="pb-2 px-2  hover:opacity-70 transition-all duration-300">
                      <Link className="w-full" href={"/dashboard/menu/photos"}>
                        Upload Photos
                      </Link>
                    </div>
                  </div>
                )}
              </td>
            </tr>
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
