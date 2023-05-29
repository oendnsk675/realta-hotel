import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl mb-8 font-extrabold text-left">
        <span className="blue_gradient">Edit Menu</span>
      </h1>
      <form className="flex flex-col gap-2">
        <div className="flex items-center">
          <label htmlFor="name" className="mr-3 w-24">
            Resto Menu
          </label>
          <input
            type="text"
            className="rounded-md w-80 p-1 px-2 border"
            placeholder="Type here"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="name" className="mr-3 w-24">
            Price
          </label>
          <input
            type="text"
            className="rounded-md w-80 p-1 px-2 border"
            placeholder="Type here"
          />
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="name" className="mr-3 w-24">
            Available
          </label>
          <input
            type="checkbox"
            className="rounded-md p-1 px-2 border w-fit"
            placeholder="Type here"
          />
        </div>

        <div className="flex gap-2 mt-5">
          <Link
            className="px-5 py-1 text-sm bg-indigo-500 rounded-md text-white"
            href={"/admin"}
          >
            Cancel
          </Link>
          <Link
            className="px-5 py-1 text-sm bg-primary-orange rounded-md text-white"
            href={"/admin"}
          >
            Save
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
