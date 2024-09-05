import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';


export default function LayOut() {
    const [count, setCount] = useState(0);
    useEffect(()=>{

    },[])
  return (
    <>
    <Navbar/>
    <div className='container mx-auto py-6 my-20 '>
      <Outlet></Outlet>
    </div>
    <Footer/>
    </>
  )
}
