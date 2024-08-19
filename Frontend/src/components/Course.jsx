import React from 'react'
import axios from 'axios'
import Cards from './Cards'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'

function Course() {
  const [book, setBook] = useState([])
  useEffect(() => {
    const getBook=async()=>{
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data)
       } catch (error) {
        console.log(error)
       }
      }
      getBook();
  
  }, []);

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>

      <div className='mt-28 z-30 items-center justify-center text-center'>
        <h1 className='text-xl md:text-3xl'>We're delighited to have you <span className='text-pink-500'>Here!!</span> :) </h1>
        <p className='mt-12'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nesciunt aliquam eius, aperiam placeat explicabo aut officiis voluptates ad adipisci. Ea fuga natus eveniet dolor. Sunt nesciunt minus debitis iure.</p>

        <Link to= "/">
          <button className='mt-5 bg-pink-500 px-4 py-2 rounded-lg text-white hover:bg-pink-700 duration-300'>Back</button>
        </Link>

      </div>

      <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
        {
          book.map((item) => (
            <Cards key={item.id} item={item} />
          ))
        }
      </div>

    </div>
  )
}

export default Course
