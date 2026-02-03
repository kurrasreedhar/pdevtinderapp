import axios from "axios"
import { BASE_URL } from "../utils/Constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"


export const Connections=()=>{
    const dispatch= useDispatch()
    const userconnections= useSelector(store=>store?.connections)

   const connectionHandler=async()=>{
    try{
    const res= await axios.get(BASE_URL+"/user/request/connections",{withCredentials:true})
    dispatch(addConnections(res?.data?.requests))   }
   catch(err){
    console.log(err)
   }}
   useEffect(()=>{
    connectionHandler()
   },[])
   if(userconnections?.length == 0) return (<h1>no connections</h1>) 
    return(<div className="text-center"> 
        <h1 className="text-2xl text-pink-900">Connections</h1>
         {userconnections?.length>0 ? (userconnections.map((connection)=>{
            const {firstName,lastName,bio,photoUrl,age,gender,_id}= connection
           return (<div className="w-[35%] flex h-20 my-2 mx-auto bg-amber-600" key={_id}> 
            <div>
                <img src={photoUrl} alt="img" className="h-18 w-20 rounded-full m-1"/>
            </div>
            <div className="flex flex-col justify-start items-start mx-2">
            <h2>{firstName + " "+ lastName} </h2>
            <h2>{age +" , "+ gender}</h2>
              <h2>{bio} </h2>
            </div>
           </div>)
         })):<h1>no connections</h1>}
    </div>)
}