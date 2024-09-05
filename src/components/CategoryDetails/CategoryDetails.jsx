import React from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
async function fetchProducts() {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return data.data;
}
export default function CategoryDetails() {

  const { category } = useParams(); 
  const { data: allProducts, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const relatedProducts = allProducts?.filter(
    (product) => product.category.name === category
  ) || [];

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
      {relatedProducts.map((product) => (
        <div key={product._id} className="xl:w-1/4 lg:w-2/4 sm:w-full">
          <div className="product py-5 mx-5 text-center">
            <Link
              to={`/productdetails/${product._id}/${product.category.name}`}
            >
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
  );
}
