import { useDispatch } from "react-redux"
import { removeFeedUsers } from "../utils/feedSlice"
import axios from "axios"
import { BASE_URL } from "../utils/Constants"


export const Usercard=({data})=>{
  const dispatch= useDispatch()
  const {_id,firstName,lastName,photoUrl,skills,gender,age,bio}=data
const id= _id
   const cardResHandler=async(status,id)=>{
    try{
      const res= await axios.post(BASE_URL +"/request/send/"+status+"/"+id,{},{withCredentials:true})
      console.log(res)
      console.log(id)
      dispatch(removeFeedUsers(id))
      }
      catch(err){
        console.error(err)
      }}

  return(
        <div className= " my-2">
            <div className="card bg-gray-800 w-68 shadow-sm">
  <figure>
    <img className=" w-66 h-66 m-1"  src={photoUrl} alt="propic" />
  </figure>
  <div className="card-body text-white">
    <h2 className="card-title">{firstName + " "+ lastName}</h2>
   {bio && <p>{bio}</p>}
     {gender && <p>{gender}</p>} {age && <span>{age}</span>}
      {skills && <p>{skills}</p>}
    <div className="card-actions justify-center">
      <button className="btn btn-secondary" onClick={()=>cardResHandler("ignored",id)}>Ignore</button>
       <button className="btn btn-primary" onClick={()=>cardResHandler("interested",id)}>Interested</button>
    </div>
  </div>
</div>
        </div>
    ) 
}