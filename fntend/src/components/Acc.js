import React, { useEffect, useState } from "react";
import {createBrowserRouter, RouterProvider, useNavigate, useLocation, Link, Outlet} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText, useRadioGroup} from "@material-ui/core";
import AccLogin from "./AccLogin";
import AccLogout from "./AccLogout";



export default function Acc() {
    const [Token,SetToken] = useState('');
    const location = useLocation();
    useEffect(()=>{
        if (location.state){SetToken(location.state.token)};
    })
    const history = useNavigate()

    // const is_have_token = async()=>{
        
    // if(Token){
    //     history('/logout')
    // }else{
    //     history('/login')
    // }
    // }
    
    return(
        <div>Token: {Token}</div>
        // <div></div>
    )
}

