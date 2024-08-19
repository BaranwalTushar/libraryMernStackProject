// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useForm } from "react-hook-form"

// function Login() {
//   const {
//     register,
//     handleSubmit,

//     formState: { errors },
//   } = useForm()
//   const onSubmit = (data) => console.log(data)
//   return (
//     <div>
//       {/* You can open the modal using document.getElementById('ID').showModal() method */}

//       <dialog id="my_modal_3" className="modal ">
//         <div className="modal-box">
//           <form onSubmit={handleSubmit(onSubmit)} method="dialog">
//             {/* if there is a button in form, it will close the modal */}
//             <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-black">✕</Link>
//           </form>
//           <h3 className="font-bold text-lg dark:text-black text-white">Login</h3>
//           <div className='mt-4 dark:text-black'>
//             <span >Email :</span>
//             <br />
//             <input type="email" placeholder='Enter your email...' className='w-80 py-1 px-3 rounded-md outline-1 mt-2' {...register("email", { required: true })} />
//             {errors.email && <span>This field is required</span>}
//           </div>

//           <div className='mt-4 dark:text-black'>
//             <span>Password :</span>
//             <br />
//             <input type="text" placeholder='Enter your password...' className='w-80 py-1 px-3 rounded-md outline-1 mt-2' {...register("password", { required: true })} />
//             {errors.password && <span>This field is required</span>}
//           </div>

//           <div className='flex justify-around mt-4'>
//             <button type="submit" className=' bg-pink-500 px-3 py-1 rounded-md text-white hover:bg-pink-700 duration-300'>Login</button>
//             <p>Not registered? <Link to="/signup" className='underline text-blue-800 cursor-pointer'>Signup</Link></p>
//           </div>

//         </div>
//       </dialog>
//     </div>
//   )
// }

// export default Login

import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {

    // Close the modal manually after form submission
    // document.getElementById('my_modal_3').close();

    // connection with backend
    const userInfo = {

      email: data.email,
      password: data.password,
    }
    await axios.post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          toast.success('Login successfully');
          document.getElementById("my_modal_3").close();
          window.location.reload();

        }
        //implementation to display in local storage
        localStorage.setItem("Users", JSON.stringify(res.data.user))
      }).catch((err) => {
        if (err.response) {
          console.log(err)

          toast.error("Error:" + err.response.data.message);
        }
      })
  }

  const closeModal = () => {
    document.getElementById('my_modal_3').close();
  }

  return (
    <div>
      {/* Open the modal using document.getElementById('my_modal_3').showModal() */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 text-white">
          {/* Close button is outside the form now */}
          <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white">✕</button>

          <h3 className="font-bold text-lg text-black dark:bg-slate-900 dark:text-white">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4 text-black dark:bg-slate-900 dark:text-white'>
              <label>Email:</label>
              <br />
              <input
                type="email"
                placeholder='Enter your email...'
                className='w-80 py-1 px-3 rounded-md outline-1 mt-2 dark:text-black'
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className='text-sm text-red-600 ml-0'>This field is required</span>}
            </div>

            <div className='mt-4 text-black  dark:bg-slate-900 dark:text-white'>
              <label>Password:</label>
              <br />
              <input
                type="password"
                placeholder='Enter your password...'
                className='w-80 py-1 px-3 rounded-md outline-1 mt-2 dark:text-black'
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
            </div>

            <div className='flex justify-around mt-4'>
              <button
                type="submit"
                className='bg-pink-500 px-3 py-1 rounded-md text-white hover:bg-pink-700 duration-300'>
                Login
              </button>
              <p><span className=' text-black dark:bg-slate-900 dark:text-white'>Not registered?</span> <Link to="/signup" className='underline text-blue-800 cursor-pointer'>Signup</Link></p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Login