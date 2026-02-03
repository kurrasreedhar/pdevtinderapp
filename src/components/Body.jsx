import { Navbar } from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import { Footer } from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import axios from "axios"
import { useEffect } from "react"
import { BASE_URL } from "../utils/Constants"
export const Body=()=>{
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const user= useSelector(store=>store?.user)

   const fetchUser = async () => {
  try {
    const res = await axios.get( BASE_URL + "/profile",{ withCredentials: true }  )
    dispatch(addUser(res.data))
  } catch (err) {
    const status = err.response?.status
    if (status === 400 || status === 401) {
      navigate("/login")
    }
    console.error(err)
  }
}

useEffect(() => {
  if (!user) {
    fetchUser()
  }
}, [user])


    return(<div>
         <Navbar/>
        <Outlet/>
         <Footer/>
    </div>)
}