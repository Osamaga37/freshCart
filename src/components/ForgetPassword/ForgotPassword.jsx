import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  async function handleForgotPassword(values) {
    setIsLoading(true);
    try {
      setIsLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      if (data.statusMsg === 'success') {
          setIsLoading(false);
          toast.success("Code Sent!");
          navigate("/verifycode");
      }
  } catch (err) {
      setIsLoading(false)
      toast.error(err?.response?.data?.message);
      console.log(err);
  }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      <div className="w-4/5 mx-auto forgot-password">
        <h2 className="text-3xl font-bold text-green-600 mb-5">
          Forgot Password
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              id="email"
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email address
            </label>
          </div>

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
