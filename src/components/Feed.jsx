import axios from "axios"
import { BASE_URL } from "../utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeedUsers } from "../utils/feedSlice"
import { Usercard } from "./UserCard"

export const Feed=()=>{
    const dispatch= useDispatch()
    const feeduser= useSelector(store=>store?.feed)
    const user= useSelector(store=>store?.user)


    const Feedusers= async()=>{
        if(feeduser) return
          try{
          
        const res= await axios.get(BASE_URL+"/feed",{withCredentials:true})
        console.log(res)
       dispatch(addFeedUsers(res?.data?.feedUsers))
    }
    catch(err){
 console.error(err)
    }}
      

    useEffect(()=>{
    user && Feedusers()
},[])
     if(!feeduser) return 

     if (feeduser.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

    return( feeduser && (<div className="flex justify-center my-8">
       <Usercard data={feeduser[0]}/>
    </div>))
}