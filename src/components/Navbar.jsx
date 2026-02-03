import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/Constants"
import { removeUser } from "../utils/userSlice"
import { emptyFeedUsers } from "../utils/feedSlice"
import { removeConnections } from "../utils/connectionSlice"
import { emptyRequest } from "../utils/requestslice"

export const  Navbar=()=>{
  const dispatch= useDispatch()
  const navigate=useNavigate()
  const user= useSelector(store=>store?.user)
   const handleLogout=async()=>{
    try{  
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
    navigate("/login")
    dispatch(emptyRequest())
    dispatch(emptyFeedUsers())
    dispatch(removeConnections())
    dispatch(removeUser())
   }
   catch(err){
    console.log(err?.message)
   }
   }
  
return (
    <div className="navbar bg-gray-800 text-neutral-content min-h-0 h-11 px-2">
         <div className="flex-1 ">
  <Link to="/" className="btn btn-ghost  text-xl">Dev-Tinder</Link>
  </div>
 {user && <div className="flex gap-1 items-center">Welcome ,{user?.firstName}
    <div className="dropdown dropdown-end mx-3 flex my-0 ">
      <div tabIndex={0} role="button" className="avatar">
        <div className="w-8 rounded-full">
          <img className=" hover:not-even:"
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between" >
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
)
}