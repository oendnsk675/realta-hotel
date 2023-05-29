"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [menu, setMenu] = useState({
    remeName: "",
    remePrice: "",
    remeStatus: "NOT-AVAILABLE",
  });

  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);

  const addMenu = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3002/resto-menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      });
      console.log(menu);

      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = (event) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      remeStatus: event.target.value,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl mb-8 font-extrabold text-left">
        <span className="blue_gradient">Add Menu</span>
      </h1>
      <form onSubmit={addMenu} className="flex flex-col gap-2">
        <div className="flex items-center">
          <label htmlFor="name" className="mr-3 w-24">
            Resto Menu
          </label>
          <input
            value={menu.remeName}
            onChange={(e) => setMenu({ ...menu, remeName: e.target.value })}
            type="text"
            className="rounded-md w-80 p-1 px-2 border"
            placeholder="Type here"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="name" className="mr-3 w-24">
            remePrice
          </label>
          <input
            value={menu.remePrice}
            onChange={(e) => setMenu({ ...menu, remePrice: e.target.value })}
            type="text"
            className="rounded-md w-80 p-1 px-2 border"
            placeholder="Type here"
          />
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="name" className="mr-3 w-24">
            remeStatus
          </label>
          <select
            className="rounded-md w-80 p-1 px-2 border"
            id="availability"
            value={menu.remeStatus}
            onChange={handleStatusChange}
          >
            <option value="AVAILABLE">Available</option>
            <option value="NOT-AVAILABLE">Non-Available</option>
          </select>
        </div>

        <div className="flex gap-2 mt-5">
          <Link
            className="px-5 py-1 text-sm bg-indigo-500 rounded-md text-white"
            href={"/admin"}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1 text-sm flex justify-center items-center gap-3 bg-primary-orange rounded-md text-white"
          >
            {submitting && (
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {!submitting && <span>Save</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
