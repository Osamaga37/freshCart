import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
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
    <div className="row">
      {data.data.data.map((brand) => (
        <div
          key={brand._id}
          className="xl:w-1/5 lg:w-2/5 sm:w-full py-6 px-10 my-10 text-center flex justify-center items-center p-6 mx-5 shadow-lg hover:scale-110 transform duration-300 border-2 border-green-700"
        >
          <Link to={`/branddetails/${brand._id}`}>
            <img src={brand.image} alt={brand.name} className="w-full" />
            <h3 className="text-center font-semibold text-green-600">
              {brand.name}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
