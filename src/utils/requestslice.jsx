import { createSlice } from "@reduxjs/toolkit";

export const RequestSlice= createSlice({
    name:"Request",
    initialState:null,
    reducers:{
         addRequests:(state,action)=>{
           return action.payload
         },
         removeRequest:(state,action)=>{
          const newArr= state.filter(req=> req._id!== action.payload)
            return newArr
         },
         emptyRequest:(state,action)=>{
          return null
         }

    }
})

export const {addRequests,removeRequest,emptyRequest}= RequestSlice.actions
export default RequestSlice.reducer