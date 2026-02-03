import axios from "axios"
import { BASE_URL } from "../utils/Constants"
import { useEffect } from "react"
import { addRequests,removeRequest } from "../utils/requestslice"
import { useDispatch, useSelector } from "react-redux"


export const Requests=()=>{
    const request= useSelector(store=>store?.request)
    const dispatch=useDispatch()

    const requestHandler=async()=>{
    try{
        const res= await axios.get(BASE_URL+"/user/request/pendings",{withCredentials:true})
             dispatch(addRequests(res?.data?.pendingRequest))
    }
    catch(err){
        console.log(err)
    }}

    useEffect(()=>{
         requestHandler()
    },[])
    
     const requestResHandler=async(status,id)=>{
        try{
             await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
             dispatch(removeRequest(id))
        }  
        catch(err){
            console.log(err)
        }
    }

    return<div>
        {request?.length>0 ? (request.map((req)=>{
            const id= req._id
            const {firstName,lastName,bio,photoUrl,age,gender,_id}= req.fromUserId
           return (<div className="w-[37%] flex my-2 mx-auto bg-amber-600" key={_id}> 
            <div>
                <img src={photoUrl} alt="img" className="h-18 w-20 rounded-full m-2"/>
            </div>
            <div className="flex flex-col items-start text-md mx-4">
            <h2>{firstName + " "+ lastName} </h2>
            <h2>{age +" , "+ gender}</h2>
              <h2>{bio} </h2>
            </div>
            <div className="flex justify-center items-center">
                <button className="btn btn-success mx-2 " onClick={()=>requestResHandler("rejected",id)} >reject</button>
                <button className="btn btn-info mx-2" onClick={()=>requestResHandler("accepted",id)}>accept</button>
                </div>
           </div>)
         })):<h1>no request</h1>}
    </div>
}