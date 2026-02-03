import { addUser } from "../utils/userSlice"
import axios from "axios"
import { Usercard } from "./UserCard"
import { useState } from "react"
import { BASE_URL } from "../utils/Constants"
import { useDispatch } from "react-redux"
export const EditProfile =({user})=>{
   const dispatch= useDispatch()
   
    const [firstName , setFirstName]=useState(user?.firstName)
    const [lastName,setLastName]=useState(user?.lastName)
    const [photoUrl,setPhotoUrl]=useState(user?.photoUrl)
    const [age,setAge]=useState(user?.age)
    const [gender,setGender]=useState(user?.gender)
    const [skills,setSkills]= useState(user?.skills)
    const [bio,setBio]= useState(user?.bio)
    const [error,setError]= useState("")
    const [showtoaster, setShowToaster]=useState(false)
    
    const saveHandler=async()=>{
        setError("")
       try{
          const res= await axios.patch(BASE_URL+"/profile/edit",
            {firstName,lastName,photoUrl,age,gender,skills,bio},{withCredentials:true})
            dispatch(addUser(res?.data?.data)) 
            setShowToaster(true)
            setTimeout(()=>{
             setShowToaster(false)
            },3000)
    }
    catch(err){
       setError(err.message)
    }
    }
   
     
    return(
        <div className="flex justify-center bg-neutral-900">
    <div className="flex justify-center mx-10 mb-6 mt-1 ">
          <div className="card bg-gray-800 m-0 text-white input-accent-black w-82 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title justify-center ">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Bio:</span>
                  </div>
                  <input
                    type="text"
                    value={bio}
                    className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </label>
                 <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">skills:</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    className="input bg-neutral-900 text-slate-200 border border-slate-600 w-full max-w-xs"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-active text-emerald-950" onClick={saveHandler} >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
    <Usercard data={user}/>
    {showtoaster && <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>New Profile Data Saved</span>
  </div>
</div>}
    </div>
   
    )
}