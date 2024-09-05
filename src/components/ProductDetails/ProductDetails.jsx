import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick/lib/slider";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id, category } = useParams();

  let { addCartItem } = useContext(CartContext);

  const [productDetails, setProductDetails] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  function changeState(id){
    setItems([]);
    setTimeout(() => {
      items[id] = true;
      setItems(items);
    },0)
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function addToCart(id) {
    setLoading(true);
    let res = await addCartItem(id);
    if(res) {
      toast.success("Item added to cart");
    }
    else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);
  return (
    <>
      <div className="row mb-20">
        <div className="w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src) => (
              <img src={src} key={src} alt={productDetails?.title} />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-5">
          <h3 className=" text-xl text-green-800 font-semibold">
            {productDetails?.title}
          </h3>
          <p>{productDetails?.description}</p>
          <h3 className="text-lg font-semibold">
            Category:{" "}
            <span className="text-green-800">
              {productDetails?.category.name}
            </span>
          </h3>
          <h2>{productDetails?.price}EGP</h2>

          <button className="btn w-full" onClick={() => {addToCart(productDetails._id); changeState(productDetails._id)}}>
            {loading && items[productDetails._id] ? <i className="fas fa-spinner fa-spin"></i> : <span>Add to cart</span>}
            </button>
        </div>
      </div>

      <div className="row">
        {relatedProducts.map((product) => (
          <div key={product._id} className="w-1/6">
            <div className="product py-5 mx-5 text-center">
              <Link
                to={`/productdetails/${product._id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt={product.title} />
                <span>{product.category.name}</span>
                <h3 className="text-lg font-normal text-green-600">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <button className="btn">Add to cart</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
