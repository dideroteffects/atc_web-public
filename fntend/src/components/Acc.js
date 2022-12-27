import React, { useEffect, useState } from "react";
import {createBrowserRouter, useNavigate, useLocation, Link, Outlet} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText, useRadioGroup} from "@material-ui/core";

export default function Acc() {
    
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
        
    },[])
    
    if (usersession){
        history('./logout');
    }else{
        history('./login');
    }

    return(
        <div>
        </div>

    )
}

