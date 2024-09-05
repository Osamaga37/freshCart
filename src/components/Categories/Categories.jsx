import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ClimbingBoxLoader color={"#36d7b7"} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="row mx-auto">
      {data.data.data.map((category) => (
        <div
          key={category._id}
          className="xl:w-1/5 lg:w-2/5 sm:w-full shadow-lg text-center flex justify-center items-center border-2 border-green-700 mx-5 mt-10 py-6 px-10"
        >
          <Link to={`/categories/${category.name}`}>
            <div className="w-full h-[200px] ">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[70%]"
              />
              <h3 className="text-center font-semibold text-green-800">
                {category.name}
              </h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
