import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function payment() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let { cartId, clearCartUi } = useContext(CartContext);
  const [isOnline, setIsOnline] = useState(false);
  const currentUrl = window.location.href;

  function detectOnline(values) {
    if (isOnline) {
      onlinePayment(values);
    } else {
      cashOrder(values);
    }
  }

  async function cashOrder(values) {
    const apiBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        apiBody,
        {
          headers: {
            token: window.localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        console.log("cash order", res);
        clearCartUi();
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  async function onlinePayment(values) {
    const apiBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        apiBody,
        {
          headers: {
            token: window.localStorage.getItem("userToken"),
          },
          params: {
            url: `${currentUrl}`,
          },
        }
      )
      .then((res) => {
        console.log("online order", res);
        clearCartUi();
        window.location.href = res.data.session.url;
      })
      .catch((err) => {
        console.log("online error", err);
      });
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    // onSubmit: cashOrder,
    onSubmit: detectOnline,
  });
  useEffect(() => {}, []);
  return (
    <div className="w-2/3 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your details address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your City
          </label>
        </div>

        <div className="flex items-center justify-evenly mt-8">
          <button
            onClick={() => {
              setIsOnline(false);
            }}
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "Cash Order"
            )}
          </button>
          <button
            onClick={() => {
              setIsOnline(true);
            }}
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "Pay Your Order Online"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// import React, { useContext, useState } from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import { CartContext } from "../../Context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Payment() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [submitHandler, setSubmitHandler] = useState(null); // State to store the submit handler function
//   let { cartId, clearCartUi } = useContext(CartContext);
//   let navigate = useNavigate();

//   async function cashOrder(values) {
//     setIsLoading(true);
//     try {
//       const apiBody = {
//         shippingAddress: values,
//       };

//       const res = await axios.post(
//         `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
//         apiBody,
//         {
//           headers: {
//             token: window.localStorage.getItem("userToken"),
//           },
//         }
//       );
//       console.log("cash order", res);
//       clearCartUi();
//     } catch (err) {
//       console.log("error", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function onlinePayment(values) {
//     setIsLoading(true);
//     try {
//       const apiBody = {
//         shippingAddress: values,
//       };

//       const res = await axios.post(
//         `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
//         apiBody,
//         {
//           headers: {
//             token: window.localStorage.getItem("userToken"),
//           },
//           params: {
//             url: encodeURIComponent('http://localhost:5173/'),
//           },
//         }
//       );
//       console.log("online order", res);
//       clearCartUi();
//     } catch (err) {
//       console.log("online error", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   let formik = useFormik({
//     initialValues: {
//       details: "",
//       phone: "",
//       city: "",
//     },
//     onSubmit: (values) => {
//       if (submitHandler) {
//         submitHandler(values); // Calls the appropriate handler based on which button was clicked
//       }
//     },
//   });

//   return (
//     <div className="w-2/3 mx-auto">
//       <form onSubmit={formik.handleSubmit}>
//         {/* Form Fields */}
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.details}
//             name="details"
//             id="details"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="details"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Enter your details address
//           </label>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.phone}
//             name="phone"
//             id="phone"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="phone"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Enter your phone number
//           </label>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.city}
//             name="city"
//             id="city"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="city"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Enter your City
//           </label>
//         </div>

//         <div className="flex items-center justify-evenly mt-8">
//           <button
//             type="button"
//             onClick={() => {
//               setSubmitHandler(cashOrder);
//               formik.handleSubmit();
//             }}
//             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             {isLoading && submitHandler === cashOrder ? (
//               <i className="fa fa-spinner fa-pulse"></i>
//             ) : (
//               "Cash Order"
//             )}
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               setSubmitHandler(onlinePayment);
//               formik.handleSubmit();
//             }}
//             className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             {isLoading && submitHandler === onlinePayment ? (
//               <i className="fa fa-spinner fa-pulse"></i>
//             ) : (
//               "Pay Your Order Online"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
