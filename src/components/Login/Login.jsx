import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";


export default function Login() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);
  let { getCartItems } =useContext(CartContext)
 function handelLogin(formValues) {
  setIsLoading(true)
 axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",formValues)
    .then((res)=> {
      if (res.data.message === "success") {
        setIsLoading(false)
        localStorage.setItem("userToken", res.data.token);
        setUserLogin(res.data.token);
        getCartItems();
      navigate("/");
      }
    })
    .catch((res)=>{
      setIsLoading(false)
      setApiError(res?.response.data.message);
    });
    console.log('Login');
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email").email("Invalid Email").required("Required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("Required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <div className="w-4/5 mx-auto">
        {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
</div> : null}
        <h2 className="text-3xl font-bold text-green-600 mb-5">Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email address
            </label>
          </div>
          {formik.touched.email && formik.errors.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
</div> : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Password
            </label>
          </div>
          {formik.touched.password && formik.errors.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
</div> : null}
<div className="flex items-center justify-between mt-4 flex-col lg:flex-row">
          <p>Don't have an account? <Link to="/register" className="text-green-700">Register</Link></p>
          <p>
              Forgot your password?{" "}
              <Link to="/forgotpassword" className="text-green-700">
                Reset Here
              </Link>
            </p>

          </div>
         <div className="flex items-center mt-8">
         <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Submit"}
            
          </button>
         </div>
        
        </form>
      </div>
    </>
  );
}
