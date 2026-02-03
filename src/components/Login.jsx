import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";

export const Login=()=>{
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [isSignup,setIsSignUp]=useState(false)
  const [emailId,setEmailId]= useState("")
  const [password,setPassword]= useState("")
  const [isError,setIsError]= useState("")
  const navigate= useNavigate()
const dispatch= useDispatch()

   const loginHandler =async()=>{
      setIsError("")
    try{
    const res= await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true})
      dispatch(addUser(res?.data))
     navigate("/")
   }catch(err){
    console.log(err)
    setIsError(err?.response?.data || "something went wromg")
   }}

   const signUpHandler=async()=>{
    setIsError("")
    try{
      const res= await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      console.log(res)
      dispatch(addUser(res?.data?.data))
      navigate("/profile")
    }
    catch(err){
      console.error(err)
      setIsError(err.response.data || "something went wromg")
    }

   }

    return(
    <div className=" flex justify-center items-center h-fit m-0">
   <div className="card card-border bg-slate-900 w-90 ">
  <div className="card-body">
    <h2 className="card-title justify-center text-white text-xl">{isSignup?"Signup":"Login"}</h2>
   { isSignup && <fieldset className="fieldset px-8 py-0">
 <legend className="fieldset-legend text-white text-[130%]">Firstname</legend>
  <input type="text" className="input"  placeholder="Type here" onChange={(e)=>setFirstName(e.target.value)} />
</fieldset>}
  {isSignup && <fieldset className="fieldset px-8 py-0">
  <legend className="fieldset-legend text-white text-[130%]">Lastname</legend>
  <input type="text" className="input"  placeholder="Type here" onChange={(e)=>setLastName(e.target.value)} />
</fieldset>}
    <fieldset className="fieldset px-8 py-0">
  <legend className="fieldset-legend text-white text-[130%]">Email</legend>
  <input type="text" value={emailId} className="input"  placeholder="Type here" onChange={(e)=>setEmailId(e.target.value)} />
</fieldset>
<fieldset className="fieldset px-8 py-0">
  <legend className="fieldset-legend text-white text-[130%]">Password</legend>
  <input type="password" className="input"  placeholder="Type here" value={password} onChange={(e)=>setPassword(e.target.value)}   />
</fieldset>
 <p className="text-red-800 flex justify-center text-[130%] ">{isError}</p>
    <div className="card-actions flex flex-col items-center ">
      <button className="btn btn-primary" onClick={isSignup? signUpHandler :loginHandler} >{isSignup?"Signup":"Login"}</button>
      <h2 className="text-lg text-white " onClick={()=>setIsSignUp(!isSignup)} >{isSignup? "Already a member, kindly login" : "New to devTinder , Signup"} </h2>
    </div>
  </div>
</div>
    </div>
    )
}