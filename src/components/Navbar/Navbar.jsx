import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let { userLogin, setUserLogin } = useContext(UserContext);
  let {numOfCartItems} = useContext(CartContext)

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-gray-100 fixed text-center top-0 right-0 left-0 z-50">
      <div className="flex justify-around">
        <div className="container mx-auto py-2 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between w-full lg:w-auto mx-7">
            <div className="flex items-center flex-col lg:flex-row justify-center">
              <img width={110} src={logo} alt="fresh cart logo" />
            </div>
          </div>
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex flex-col lg:flex-row items-center mt-5 lg:mt-0`}
          >
            {userLogin !== null ? (
              <>
                <li className="py-2">
                  <NavLink
                    className="menu mx-2 text-sm  "
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className="menu mx-2 text-sm"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className="menu mx-2 text-sm"
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className="menu mx-2 text-sm"
                    to="/wishlist"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className="menu mx-2 text-sm"
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="py-2">
                  <NavLink
                    className="menu mx-2 text-sm "
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex flex-col lg:flex-row items-center lg:w-auto w-full`}
          >
            <ul className="flex flex-col lg:flex-row items-center mt-5 lg:mt-0">
              {userLogin === null ? (
                <>
                  <li className="py-2">
                    <NavLink
                      className="mx-2 text-lg text-slate-900 font-light"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="mx-2 text-lg text-slate-900 font-light"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center py-2">
                    <Link
                      className="mx-2 text-lg text-slate-900 font-light"
                      to="/cart"
                    >
                      <i className="fa-solid mx-2 text-3xl fa-cart-shopping relative">
                        <span className="absolute top-0 right-0 px-1 text-sm text-white bg-green-500 rounded-full">{numOfCartItems}</span>
                      </i>
                    </Link>
                  </li>

                  <li className="py-2" onClick={logOut}>
                    <span className="mx-2 text-lg text-slate-900  font-light cursor-pointer">
                      LogOut
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-900 focus:outline-none me-10 top-2 right-0 z-50 fixed"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
