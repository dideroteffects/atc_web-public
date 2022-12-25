import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useLocation, useEffect, useNavigate, Link} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText} from "@material-ui/core";

export default function AccLogout(props){
    
    function logout_button_pressed(e){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch('/dj-rest-auth/logout/',requestOptions
        ).then((response)=>console.log(response)
        ).catch((err)=>console.log(err));
    }

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Button onClick={logout_button_pressed}>LOGOUT</Button>
            
        </Grid>
    </Grid>);
}