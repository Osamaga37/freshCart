import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function verifyCode(resetCode) {
    setIsLoading(true);
    try {
      setIsLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
     console.log(data);
     if(data.status=="Success")
     {
      navigate("./resetpassword");
     }
  } catch (err) {
      setIsLoading(false)
      toast.error(err?.response?.data?.message);
  }
  }
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyCode,
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Verify Reset Code</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="resetCode"
            className="block text-sm font-medium text-gray-700"
          >
            Reset Code
          </label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa fa-spinner fa-pulse"></i>
          ) : (
            "Verify Code"
          )}
        </button>
      </form>
    </div>
  );
}
