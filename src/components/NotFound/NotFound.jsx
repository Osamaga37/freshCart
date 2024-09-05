import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-2xl text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">Sorry, the page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  )
}
