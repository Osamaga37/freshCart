import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

const headers = {
  token: window.localStorage.getItem("userToken"),
};

export default function WishListContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);

  async function getUserWishList() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishlistItems(response.data.data);
      setNumOfWishlistItems(response.data.data.length);
      return response;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }


  async function addWishListItem(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers: { token: window.localStorage.getItem("userToken") } }
      );
      await getUserWishList();
      return response;
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  async function deleteWishListItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      await getUserWishList();
      return response;
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <WishListContext.Provider
      value={{ getUserWishList, addWishListItem, deleteWishListItem, wishlistItems, numOfWishlistItems }}
    >
      {children}
    </WishListContext.Provider>
  );
}