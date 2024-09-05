import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/image1.jpg";
import img2 from "../../assets/images/image2.jpg";
import Slider from "react-slick";
import axios from "axios";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
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
    <div className="row w-3/4 mx-auto flex-col lg:flex-row">
      <div className="w-2/3">
        <Slider {...settings}>
          {categories?.map((category) => (
            <img
              src={category.image}
              key={category._id}
              alt="Slider Image"
              className="w-full h-[400px] mb-10"
            />
          ))}
        </Slider>
      </div>
      <div className="w-1/3 ">
        <img src={img1} alt="img1" className="w-full" />
        <img src={img2} alt="img2" className="w-full" />
      </div>
    </div>
  );
}
