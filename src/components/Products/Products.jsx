import React, { useEffect, useState } from 'react';
import RecentProducts from '../RecentProducts/RecentProducts';


export default function Products() {
    const [count, setCount] = useState(0);
    useEffect(()=>{

    },[])
  return (
    <div>
      <RecentProducts/>
    </div>
  )
}
