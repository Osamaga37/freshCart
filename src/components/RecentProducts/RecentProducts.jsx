import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishLstContext";

export default function RecentProducts() {
  let { addCartItem } = useContext(CartContext);
  let { addWishListItem, deleteWishListItem, getUserWishList } = useContext(WishListContext);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      let res = await getUserWishList();
      setWishlist(res?.data?.data?.map(item => item._id) || []);
    }
    fetchWishlist();
  }, [getUserWishList]);

  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    staleTime: 600,
  });
  

  async function addToCart(id) {
    setLoading(true);
    let res = await addCartItem(id);
    
    if (res) {
      toast.success("Item added to cart");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  async function toggleWishlist(id) {
    if (wishlist.includes(id)) {
      let res = await deleteWishListItem(id);
      if (res?.data?.status === "success") {
        toast.success("Item removed from wishlist");
        setWishlist(wishlist.filter(itemId => itemId !== id));
      } else {
        toast.error("Something went wrong");
      }
    } else {
      let res = await addWishListItem(id);
      if (res?.data?.status === "success") {
        toast.success("Item added to wishlist");
        setWishlist([...wishlist, id]);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

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
        <h2 className="text-red-500">{error.message}</h2>
      </div>
    );
  }

  return (<>
    <form className="max-w-md mx-auto mt-10">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-green-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
  </div>
</form>

    <div className="row">
      {data?.data.data.map((product) => (
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
            </Link>
            <div className="flex justify-evenly mb-5">
              <i className="fas fa-star text-yellow-300"><span className="text-black">{product.ratingsAverage}</span></i>
              <button
                className=""
                style={{ color: wishlist.includes(product._id) ? "red" : "#000" }}
                onClick={() => {
                  toggleWishlist(product._id);
                }}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
            <button
                className="btn"
                onClick={() => {
                  addToCart(product._id);
                }}
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}