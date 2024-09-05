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

  return (
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
  );
}