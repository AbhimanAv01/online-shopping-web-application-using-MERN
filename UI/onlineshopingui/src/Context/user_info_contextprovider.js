import React,{useState} from "react";

import User_info_context from "./user_info_context";


const User_info_contextprovider=({children})=>{
    
    const[user_info,setUser_info]=useState(null)

    return(
        <User_info_context.Provider value={{user_info,setUser_info}}>
            {children}
        </User_info_context.Provider>
    )
}

export default User_info_contextprovider;