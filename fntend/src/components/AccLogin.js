import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useNavigate, Link} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText} from "@material-ui/core";

export default function AccLogin(){

    const [ CliEmail, SetCliEmail ] = useState('')
    const [ CliPW, SetCliPW ] = useState('')
    const [ APIToken, SetAPIToken ] = useState('')
    const history = useNavigate()

    function email_changed(e){
        SetCliEmail(e.target.value);
    }
    function pw_changed(e){
        SetCliPW(e.target.value);
    }
    function login_button_pressed(e){
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username:"",
                email: CliEmail,
                password: CliPW,
            })
        }
        fetch('/dj-rest-auth/login/', requestOptions).then((response)=>{
            if(!response.ok){
                console.log('failed')
            }else{return response.json()}
        }).then((data)=>{
            SetAPIToken(data.access_token);
            history('/fnt',{
                state: {token:data.access_token},
            });
        }).catch((err)=>console.log(err))
    }


    return (<div>
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <FormControl>
                <TextField id="cli_email" className="acc_text"
                    label="email" variant="standard" onChange={email_changed} ></TextField>
                <TextField id="cli_password" className="acc_text"
                    inputProps={{ maxLength: 18 }} type="password"
                    label="password" variant="standard" onChange={pw_changed}></TextField>
                <FormHelperText id="login-helper-text">Login to Email.</FormHelperText>
                {/* style={{height:100}} size='small' variant="outlined" filled={true} >Login to Email.</FormHelperText> */}
            </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
            <Grid><Button className="acc_button"
                onClick={login_button_pressed}>LOGIN</Button></Grid>
            <Grid><Button className="acc_button"
                onClick={pw_changed}>SOCIAL LOGIN</Button></Grid>
            <Grid><Button className="acc_button">SIGNIN</Button></Grid>
        </Grid>
        {APIToken}
    </Grid>
    </div>);
}
