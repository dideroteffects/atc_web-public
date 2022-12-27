import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Grid, Button, Typography,
    TextField, FormControl, FormHelperText, Collapse} from "@material-ui/core";


export default function AccLogin(){

    const [ CliEmail, SetCliEmail ] = useState('');
    const [ CliPW, SetCliPW ] = useState('');
    // const [ APIToken, SetAPIToken ] = useState('')
    const [ ErrLogin, SetErrLogin ] = useState(false);
    const ErrMsg = "check email or password";
    const history = useNavigate();

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
                SetErrLogin(true)
            }else{return response.json()}
        }).then((data)=>{
            if(data){
                // SetAPIToken(data.access_token);
                history('/fnt',
                // {state: {token:data.access_token},}
            )
            };
        }).catch((err)=>console.log(err))
    }


    return (<div>
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            
            <Collapse in={ErrLogin} severity="error" >
                <Typography color="secondary"
                    style={{ height: 20 }} size='small'>
                    {ErrMsg}
                </Typography>
            </Collapse>
            
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl align="center">
                
                <TextField id="cli_email" className="acc_text"
                    label="email" 
                    variant={ErrLogin?"outlined":"standard"}
                    error={ErrLogin}
                    onChange={email_changed}
                    style={{width: 300, margin:5}}
                    ></TextField>
                <TextField id="cli_password" className="acc_text"
                    inputProps={{ maxLength: 18 }} type="password"
                    label="password"
                    variant={ErrLogin?"outlined":"standard"}
                    error={ErrLogin}
                    onChange={pw_changed}
                    style={{width: 300, margin:5, marginBottom:10}}
                    ></TextField>
                <FormHelperText id="login-helper-text" style={{textAlign:"center", height:100}}>
                    Login to Email : email need to '@', <br />password min length is 5,<br />
                    max length is 18 with alphabets and numbers</FormHelperText>
                {/* style={{height:100}} size='small' variant="outlined" filled={true} >Login to Email.</FormHelperText> */}
            </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
            <Grid><Button className="acc_button"
                onClick={login_button_pressed}
                style={{width:300}}
                >LOGIN</Button></Grid>
            <Grid><Button className="acc_button"
                onClick={pw_changed}
                style={{width:300}}
                >SOCIAL LOGIN</Button></Grid>
            <Grid><Button className="acc_button"
                style={{width:300}}
                >SIGNIN</Button></Grid>
        </Grid>
    </Grid>
    </div>);
}
