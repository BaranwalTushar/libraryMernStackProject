import React from 'react'

function Cards({item}) {
    
  return (
   <>
   <div className='my-4'>
   <div className="card bg-base-100 w-94 p-3 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border-spacing-7">
  <figure>
    <img
      src={item.image}
      alt="Books" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      <div className="badge badge-secondary">{item.category}</div>
    </h2>
    <p>This Key is Way to Success</p>
    <div className="card-actions felx justify-between">
      <div className=" hover:bg-pink-500 hover:text-white px-2 py-1 cursor-pointer rounded-lg ">{item.price}</div>
      <div className=" hover:bg-pink-500 hover:text-white border-[2px] cursor-pointer px-3 py-2 rounded-lg">Buy Now</div>
    </div>
  </div>
</div>
   </div>
   </>
  )
}

export default Cards
