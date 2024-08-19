import React from 'react'
import User from '../../../Backend/model/user.model'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'

function Logout() {

    const [authUser,setAuthUser] = useAuth()
    const handleLogout=()=>{
    
     try {
        setAuthUser({
            ...authUser,
            user:null,
        })
        localStorage.removeItem("Users")
        toast.success("Logout successfully")
        window.location.reload();
     } catch (error) {
        toast.error("Error:" +error.message)
     }

    }

  return (
    <div>
      <button className='px-3 py-2 bg-red-600 text-white rounded-md cursor-pointer'onClick={handleLogout}>

        Logout
        
        </button>
    </div>
  )
}

export default Logout
