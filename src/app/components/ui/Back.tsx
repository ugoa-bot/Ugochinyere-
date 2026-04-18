"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const Back = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div
      onClick={goBack}
      className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 z-50 absolute top-10 left-4"
    >
      <BsArrowLeft size={22} color="black" />
      <span className="text-white cursor-pointer">Back</span>
    </div>
  );
};

export default Back;
