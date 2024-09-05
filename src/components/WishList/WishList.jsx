import React, { useContext, useState } from "react";
import { WishListContext } from "../../Context/WishLstContext";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

export default function WishList() {
  const { getUserWishList, deleteWishListItem, wishlistItems, numOfWishlistItems } = useContext(WishListContext);
  const [loading, setLoading] = useState(false);

  async function handleFetchWishList() {
    setLoading(true);
    await getUserWishList(); 
    setLoading(false);
  }

  // Handle delete item
  async function deleteItem(productId) {
    setLoading(true);
    await deleteWishListItem(productId);
    setLoading(false);
  }

  return (<>
  {loading ? (
    <div className="flex justify-center items-center h-screen">
      <ClimbingBoxLoader color="#36d7b7" />
    </div>
  ) : (
    <div className="w-[80%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between mx-2">
          <h1 className="text-3xl text-green-700 font-bold text-center my-10">
            Wish List
          </h1>
          
        </div>

        {wishlistItems && wishlistItems.length > 0 ? (
          <>
            <div className="flex justify-between mx-10">
              <h3 className="text-gray-600 text-2xl">Total WishList items: {numOfWishlistItems}</h3>
              
            </div>

            {/* Render cart items */}
            {wishlistItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-5"
              >
                <img
                  src={item.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={item.title}
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900">{item.title.split(" ").slice(0, 2).join(" ")}</p>
                </div>
                <p>{item.price} EGP</p>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h3>Your WishList is empty</h3>
            <Link to="/products">
              <button className="btn ms-5">Shop Now</button>
            </Link>
          </div>
        )}
      </div>
  )}
  </>
    
  );
}
