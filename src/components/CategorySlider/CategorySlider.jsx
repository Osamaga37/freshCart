import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="w-[85%] mx-auto">
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id}>
            <Link to={`/categories/${category.name}`}>
              <img
                className={`${style[`img-slider`]} w-full`}
                src={category.image}
                alt={category.name}
              />
              <h3 className="text-center font-semibold text-green-800">
                {category.name}
              </h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
