import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";

export default function BrandDetails() {
  const { id } = useParams();
  const [brandDetails, setBrandDetails] = useState([]);

  function getBrandDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
    );
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["brandDetails"],
    queryFn: getBrandDetails,
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
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-4">Products for Brand</h2>
      <div className="row">
        {data.data.data.map((product) => (
          <div key={product._id} className="w-1/4">
            <div className="product py-5 mx-5 text-center">
              <Link to={`/productdetails/${product._id}/${product.name}`}>
                <img src={product.imageCover} alt={product.title} />
                <span>{product.category.name}</span>
                <h3 className="text-lg font-normal text-green-600">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <button className="btn">Add to cart</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
