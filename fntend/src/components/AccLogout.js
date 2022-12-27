import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useLocation, useEffect, useNavigate, Link} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText} from "@material-ui/core";

export default function AccLogout(props){
    
    const history = useNavigate()
    function logout_button_pressed(e){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch('/dj-rest-auth/logout/',requestOptions
        ).then((response)=>{
            if (response.ok){
                return response.json()
            }else{
            console.log(response)
            }
        }
        ).then((data)=>
            history('/fnt')
        ).catch((err)=>console.log(err));
    }

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Button onClick={logout_button_pressed} style={{width:300}}>LOGOUT</Button>
            
        </Grid>
    </Grid>);
}