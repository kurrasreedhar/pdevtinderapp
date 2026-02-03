import { createSlice } from "@reduxjs/toolkit";

const feedSlice= createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeedUsers:(state,action)=>{
            return action.payload
        },
        removeFeedUsers:(state,action)=>{
            const feedArr= state.filter((userId)=>userId._id !== action.payload)
             return feedArr
        },
        emptyFeedUsers:(state,action)=>{
            return null
        }   
    }
})

export const {addFeedUsers,removeFeedUsers,emptyFeedUsers}= feedSlice.actions
export default feedSlice.reducer