import React, { useEffect, useState } from 'react';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';


export default function Home() {
    useEffect(()=>{

    },[])
  return (
    <div>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </div>
  )
}
