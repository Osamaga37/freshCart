import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0);

const headers = {
  token: window.localStorage.getItem("userToken"),
};

export default function CartContextProvider({ children }) {
  //States
  const [cartId, setCartId] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [userId, setUserId] = useState(null);


  // Clear Cart Function
  function clearCartUi() {
    setCartId(null);
    setAllProducts(null);
    setCartPrice(0);
    setNumOfCartItems(0);
  }

  //Add to cart function
  async function addCartItem(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => {
        getCartItems();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  //Get cart items

  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {        
        setCartId(res.data.data._id);
        setUserId(res.data.data.cartOwner)
        setAllProducts(res.data.data.products);
        setCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
      })
      .catch((err) => err);
  }

  //Update cart items function

  function updateCartItem(productId, count) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setAllProducts(res.data.data.products);
        setCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Delete cart item function

  async function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  

  async function clearUserCart(){
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => getCartItems())
      .catch((err) =>err);
  }

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addCartItem,
        allProducts,
        cartPrice,
        numOfCartItems,
        getCartItems,
        updateCartItem,
        deleteCartItem,
        cartId,
        clearCartUi,
        userId,
        clearUserCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
