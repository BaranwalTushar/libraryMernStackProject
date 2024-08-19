// import React from 'react'
// import { Link } from 'react-router-dom'
// import Login from './Login'
// import { useForm } from "react-hook-form"

// function Signup() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const onSubmit = (data) => {
//     console.log(data)
//     // Close the modal manually after form submission
//     // document.getElementById('my_modal_3').close();
//   }
//   const closeModal = () => {
//     document.getElementById('my_modal_3').close();
//   }

//   return (

//     <div className='flex  h-screen items-center justify-center'>

//       <div className="w-[550px]">

//           <div className="modal-box">

//             {/* if there is a button in form, it will close the modal */}
//             <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-black">✕</button>

//             <h2 className="font-bold text-lg dark:text-black dark:text-white">Signup</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>



//               <div className='mt-4 dark:text-black'>
//                 <span>Name :</span>
//                 <br />
//                 <input type="text" placeholder='Enter your name...' className='w-80 py-1 px-3 rounded-md outline-1 mt-2'
//                   {...register("name", { required: true })}
//                 />
//                 <br />
//                 {errors.name && <span className='text-sm text-red-600 ml-0'>This field is required</span>}
//               </div>

//               <div className='mt-4 dark:text-black'>
//                 <span >Email :</span>
//                 <br />
//                 <input type="email" placeholder='Enter your email...' className='w-80 py-1 px-3 rounded-md outline-1 mt-2'
//                   {...register("email", { required: true })}
//                 />
//                 <br />
//                 {errors.email && <span className='text-sm text-red-600 ml-0'>This field is required</span>}
//               </div>

//               <div className='mt-4 dark:text-black'>
//                 <span>Password :</span>
//                 <br />
//                 <input type="text" placeholder='Enter your password...' className='w-80 py-1 px-3 rounded-md outline-1 mt-2'
//                   {...register("password", { required: true })}
//                 />
//                 <br />
//                 {errors.password && <span className='text-sm text-red-600 ml-0'>This field is required</span>}
//               </div>

//               <div className='flex justify-around mt-4'>
//                 <button className=' bg-pink-500 px-3 py-1 rounded-md text-white hover:bg-pink-700 duration-300'>Signup</button>
//                 <p>Have account? <button type="submit" className='underline text-blue-800 cursor-pointer' onClick={() => { document.getElementById("my_modal_3").showModal() }}>Login</button>
//                   <Login />
//                 </p>
//               </div>
//             </form >

//           </div>

//       </div>

//     </div>

//   )
// }

// export default Signup


import React from 'react'
import { useForm } from "react-hook-form"
import { Link,  replace,  useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import axios from 'axios'
import toast from 'react-hot-toast'

function Signup() {
const location = useLocation()
 const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    // console.log(data)
    
      //connection of Backend
      const userInfo={
        fullname:data.fullname,
        email:data.email,
        password:data.password,
      }
      await axios.post("http://localhost:4001/user/signup",userInfo)
      .then((res)=>{
        console.log(res.data)
        if(res.data){
          toast.success('Signup successfully');
         navigate(from,{replace:true});
        }
        //implementation to display in local storage
        localStorage.setItem("Users",JSON.stringify(res.data.user))
      }).catch((err)=>{
       if(err.response){
        console.log(err)
        toast.error("Error:" + err.response.data.message);
       }
      })
  }

  // Function to close the Signup modal
  const closeSignupModal = () => {
    document.getElementById('signup_modal').close();
  }

  return (
    <div className='flex h-screen items-center justify-center dark:bg-slate-800 text-white'>
      {/* Signup Modal */}
      <dialog id="signup_modal" className="modal" open> {/* Set 'open' for testing */}
        <div className="modal-box relative  dark:bg-slate-900 text-white">
          {/* Close button */}
          <Link to="/" onClick={closeSignupModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:bg-slate-900 dark:text-white">✕</Link>

          <h2 className="font-bold text-lg text-black dark:bg-slate-900 dark:text-white">Signup</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4 text-black dark:bg-slate-900 dark:text-white'>
              <label>Full Name:</label>
              <br />
              <input type="text" placeholder='Enter your name...' className='w-80 dark:text-black py-1 px-3 rounded-md outline-1 mt-2'
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <span className='text-red-600'>This field is required</span>}
            </div>

            <div className='mt-4 text-black dark:bg-slate-900 dark:text-white'>
              <label>Email:</label>
              <br />
              <input type="email" placeholder='Enter your email...' className='w-80 dark:text-black py-1 px-3 rounded-md outline-1 mt-2'
                {...register("email", { required: true })}
              />
              {errors.email && <span className='text-red-600'>This field is required</span>}
            </div>

            <div className='mt-4 text-black dark:bg-slate-900 dark:text-white'>
              <label>Password:</label>
              <br />
              <input type="password" placeholder='Enter your password...' className='w-80 dark:text-black py-1 px-3 rounded-md outline-1 mt-2'
                {...register("password", { required: true })}
              />
              {errors.password && <span className='text-red-600'>This field is required</span>}
            </div>

            <div className='flex justify-around mt-4'>
              <button type="submit" className='bg-pink-500 px-3 py-1 rounded-md text-white hover:bg-pink-700 duration-300'>
                Signup
              </button>
              <p><span className='text-black dark:bg-slate-900 dark:text-white'>Have account?</span> <button type="submit" className='underline text-blue-800 cursor-pointer' onClick={() => { document.getElementById("my_modal_3").showModal() }}>Login</button>
                   <Login />
                 </p>
             
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Signup
