import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { allProducts, cartPrice, updateCartItem, deleteCartItem, clearUserCart, numOfCartItems } =
    useContext(CartContext);
    console.log(allProducts);
    

  const [isLoading, setIsLoading] = useState(false);

  // Handle update cart item function
  function updateUserCart(id, count) {
    updateCartItem(id, count);
  }

  // Handle delete cart item function
  async function deleteCart(id) {
    let res = await deleteCartItem(id);
    if (res) {
      toast.success("Item deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  }

  // Handle clear cart function
  async function clearCartUi() {
    setIsLoading(true);
    let res = await clearUserCart();
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-[80%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between mx-2">
          <h1 className="text-3xl text-green-700 font-bold text-center my-10">
            Shopping Cart
          </h1>
          <Link to="/allorders">
            <button className="btn w-full mt-10">See Your Orders</button>
          </Link>
        </div>

        {allProducts && allProducts.length > 0 ? (
          <>
            <div className="flex justify-between mx-10">
              <h3 className="text-gray-600 text-2xl">Total cart items: {numOfCartItems}</h3>
              <h3 className="text-gray-600 text-2xl">Total price: {cartPrice} EGP</h3>
            </div>

            {/* Render cart items */}
            {allProducts?.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-5"
              >
                <img
                  src={item.product.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={item.product.name}
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900">{item.product.title.split(" ").slice(0, 2).join(" ")}</p>
                </div>
                <div className="flex items-center">
                  <button
                    disabled={item.count === 1}
                    onClick={() => updateUserCart(item.product.id, item.count - 1)}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    -
                  </button>
                  <p className="mx-4">{item.count}</p>
                  <button
                    onClick={() => updateUserCart(item.product.id, item.count + 1)}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    +
                  </button>
                </div>
                <p>{item.price} EGP</p>
                <button
                  onClick={() => deleteCart(item.product.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-evenly my-5">
              <Link to="/payment">
                <button className="btn">Buy Now</button>
              </Link>
              <button onClick={clearCartUi} className="btn">
                {isLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Clear Cart"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h3>Your cart is empty</h3>
            <Link to="/products">
              <button className="btn ms-5">Shop Now</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
