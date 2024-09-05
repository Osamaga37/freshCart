import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);

  function handelRegister(formValues) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err?.response?.data?.message);
      });
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(10, "Name must be less than 10 characters")
      .matches(/^[A-Z][a-z]{3,10}$/, "Invalid Name")
      .required("Required"),
    email: Yup.string()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid Email"
      )
      .email("Invalid Email")
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number, and one special case character"
      )
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Must be only digits")
      .required("Required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <div className="w-4/5 mx-auto">
      {apiError && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      )}
      <h2 className="text-3xl font-bold text-green-600 mb-5">Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Name
          </label>
        </div>
        {formik.touched.name && formik.errors.name && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.name}
          </div>
        )}
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
        {formik.touched.email && formik.errors.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Password
          </label>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>
        {formik.touched.rePassword && formik.errors.rePassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.rePassword}
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Phone Number
          </label>
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        )}
        <div className="d-flex justify-content-end mt-3">
          <button
            type="submit"
            className="bg-green-600 border-0 p-2 text-white rounded"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </div>
        <p className="mt-2">
          Already have an account?
          <Link className="mx-2 text-decoration-none text-green-600" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
