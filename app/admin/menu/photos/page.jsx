"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoInputChange = (event, index) => {
    const file = event.target.files[0];
    const fileWithIndex = { ...file, index, isPrimary: false };
    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      newPhotos[index] = fileWithIndex;
      return newPhotos;
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      setPhotos((prevPhotos) => {
        const newPhotos = [...prevPhotos];
        newPhotos[index] = { ...prevPhotos[index], dataURL };
        return newPhotos;
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePrimaryPhotoChange = (event, index) => {
    const isPrimary = event.target.checked;
    setPhotos((prevPhotos) => {
      const newPhotos = prevPhotos.map((photo, i) => {
        if (i === index) {
          return { ...photo, isPrimary };
        } else if (isPrimary && photo.isPrimary) {
          return { ...photo, isPrimary: false };
        } else {
          return photo;
        }
      });
      return newPhotos;
    });
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-3xl mb-8 font-extrabold text-left">
        <span className="blue_gradient">Resto Menu Sop Buntut</span>
      </h1>
      <form className="flex flex-col gap-2">
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <label
                htmlFor={`photo-${index}`}
                className="mr-3 h-48 w-48 rounded-md flex items-center justify-center p-1 px-2 border-2 box-content cursor-pointer"
              >
                {photos[index - 1] && (
                  <img
                    src={photos[index - 1].dataURL}
                    alt={`Preview-${index}`}
                    className="object-cover w-full h-full"
                  />
                )}
                {!photos[index - 1] && `Photo ${index}`}
              </label>
              <input
                type="file"
                className="hidden"
                id={`photo-${index}`}
                placeholder="Type here"
                onChange={(event) => handlePhotoInputChange(event, index - 1)}
              />
              {photos[index - 1] && (
                <div className="flex gap-2 flex-col mt-3 items-center">
                  <div className="flex gap-2 items-center">
                    <label htmlFor={`primary-${index}`}>
                      Set as Primary Photo
                    </label>
                    <input
                      type="checkbox"
                      id={`primary-${index}`}
                      checked={photos[index - 1].isPrimary}
                      onChange={(event) =>
                        handlePrimaryPhotoChange(event, index - 1)
                      }
                    />
                  </div>
                  {!photos[index - 1].isPrimary && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => removePhoto(index - 1)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
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

export default Page;
