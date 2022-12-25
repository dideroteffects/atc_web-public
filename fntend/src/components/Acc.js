import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useNavigate, Link, Outlet} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText, useRadioGroup} from "@material-ui/core";
import AccLogin from "./AccLogin";
// import AccLogout from "./AccLogout";



export default function Acc() {
    
    const [ APIToken, SetAPIToken ] = useState('')
    const history = useNavigate()
    // const is_have_token = async()=>{
    //     fetch('/')
    // }
    // if(APIToken){
    //     history('/logout')
    // }else{
    //     history('/login')
    // }

    return (
        <div>account.js
            {AccLogin()}

        </div>
        
    );

}

