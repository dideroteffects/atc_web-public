import React, { useEffect, useState } from "react";
import {createBrowserRouter, RouterProvider, useNavigate, useLocation, Link, Outlet} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText, useRadioGroup} from "@material-ui/core";
import AccLogin from "./AccLogin";
import AccLogout from "./AccLogout";



export default function Acc() {
    // const [Token,SetToken] = useState('');
    // const location = useLocation();
    // useEffect(()=>{
    //     if (location.state){SetToken(location.state.token)};
    // })
    const history = useNavigate()
    const [ usersession, Setusersession ] = useState('')
    useEffect(()=>{
        fetch('/dj-rest-auth/user/session').then((response)=>{
            if(response.ok){
                return response.json()
            }else{
                console.log(response)
            }}).then((data)=>{
                if(!data){
                    Setusersession('');
                }else{
                    Setusersession(data._auth_user_id);
                }
            }
        )
        
    })
    
    // const is_have_token = async()=>{
        
    // if(usersession){
    //     history('/logout')
    // }else{
    //     history('/login')
    // }
    // }
    // if(!usersession){
    //     // Setusersession('');
    //     history('login');
    // }else{
    //     // Setusersession(data._auth_user_id);
    //     history('logout');
    // }
    // is_have_token();

    return(
        // <div></div>
        <div>{usersession?<AccLogout />:<AccLogin />}</div>

    )
}

