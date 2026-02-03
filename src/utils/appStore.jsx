import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice"
import feed from "./feedSlice"
import connections from "./connectionSlice"
import requests from "./requestslice"

const appStore= configureStore({
    reducer:{
        user:user,
        feed:feed,
        connections:connections,
        request:requests,

    }
})

export default appStore