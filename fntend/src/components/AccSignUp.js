import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Grid, Button, Typography,
    TextField, FormControl, FormHelperText, Collapse} from "@material-ui/core";


export default function AccSignUp(){

    const [ CliEmail, SetCliEmail ] = useState('');
    const [ CliPW1, SetCliPW1 ] = useState('');
    const [ CliPW2, SetCliPW2 ] = useState('');
    const [ CliName, SetCliName ] = useState('');
    const [ CliJob, SetCliJob ] = useState('');
    // const [ VisablePW, SetVisablePW] = useState(false);
    const [ ErrEmail, SetErrEmail ] = useState(false);
    const [ ErrPW, SetErrPW ] = useState(false);
    const [ ErrSingUp, SetErrSignUp ] = useState(false);
    const ErrEmailMsg = "check Email form - ex) 'atachi@example.com' ";
    const ErrPWMsg = "password1 and password2 doesn't match";
    const ErrSignUpMsg = "check whether if all elements are filled especially Email";
    const history = useNavigate();

    
    function email_changed(e){
        SetCliEmail(e.target.value);
        if((e.target.value).includes('@')
        & (e.target.value).includes('.')
        & ((e.target.value).charAt(0) != '@')
        & ((e.target.value).charAt(0) != '.')
        & ((e.target.value).charAt((e.target.value).length-1) != '@')
        & ((e.target.value).charAt((e.target.value).length-1) != '.')
        ){
            SetErrEmail(false);
        }else{
            SetErrEmail(true);
        }
    }
    function pw_changed1(e){
        SetCliPW1(e.target.value);
    }
    function pw_changed2(e){
        SetCliPW2(e.target.value);
        // console.log(CliPW1);
        // console.log(CliPW2);
        if(CliPW1!=e.target.value){           
            SetErrPW(true)
        }else{
            SetErrPW(false)
        }
    }
    // function visable_pw_pressed(e){
    //     SetVisablePW(!VisablePW);
    // }

    function name_changed(e){
        SetCliName(e.target.value);
    }
    function job_changed(e){
        SetCliJob(e.target.value);
    }
    function signup_button_pressed(e){
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // "username": '',
                "email": CliEmail,
                "password1": CliPW1,
                "password2": CliPW2,
                "name": CliName,
                "job": CliJob,
                // email: CliEmail,
                // password1: CliPW1,
                // password2: CliPW2,
                // name: CliName,
                // job: CliJob,
            })
        }
        fetch('/dj-rest-auth/registration/', requestOptions).then((response)=>{
            if(!response.ok){
                SetErrSignUp(true);
                console.log(response.status);
            }else{return response.json()}
        }).then((data)=>{
            if(data){
                history('/fnt')
            };
        }).catch((err)=>console.log(err))
    }


    return (<div>
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            
            <Collapse in={ErrSingUp} severity="error" >
                <Typography color="secondary"
                    style={{ height: 20 }} size='small'>
                    {ErrSignUpMsg}
                </Typography>
            </Collapse>
            
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl align="center">
                
                <TextField id="cli_email" className="acc_text"
                    label="email" 
                    variant="outlined"
                    // error={ErrLogin}
                    onBlur={email_changed}
                    style={{width: 300, margin:5}}
                    ></TextField>
                <Collapse in={ErrEmail} severity="error" >
                    <Typography color="secondary"
                        style={{ height: 38, fontSize:12 }}>
                        {ErrEmailMsg}
                    </Typography>
                </Collapse>

                
                <TextField id="cli_password1" className="acc_text"
                    inputProps={{ maxLength: 18 }} type={ErrPW?"text":"password"}
                    label="password"
                    variant="outlined"
                    // error={ErrLogin}
                    onBlur={pw_changed1}
                    style={{width: 300, margin:5, marginBottom:10}}
                    ></TextField>
                <TextField id="cli_password2" className="acc_text"
                    inputProps={{ maxLength: 18 }} type={ErrPW?"text":"password"}
                    label="password check"
                    variant="outlined"
                    // error={ErrLogin}
                    onBlur={pw_changed2}
                    style={{width: 300, margin:5, marginBottom:10}}
                    ></TextField>
                <Collapse in={ErrPW} severity="error" >
                    <Typography color="secondary"
                        style={{ height: 38, fontSize:12 }}>
                        {ErrPWMsg}
                    </Typography>
                </Collapse>
                {/* <FormHelperText>{ErrPW.toString()}</FormHelperText> */}


                <TextField id="cli_name" className="acc_text"
                    inputProps={{ maxLength: 18 }}
                    label="name"
                    variant="outlined"
                    // error={ErrLogin}
                    onBlur={name_changed}
                    style={{width: 300, margin:5, marginBottom:10}}
                    ></TextField>
                <TextField id="cli_job" className="acc_text"
                    inputProps={{ maxLength: 18 }}
                    label="job"
                    variant="outlined"
                    // error={ErrLogin}
                    onBlur={job_changed}
                    style={{width: 300, margin:5, marginBottom:10}}
                    ></TextField>
                <FormHelperText id="login-helper-text" style={{textAlign:"center", height:100}}>
                    Sign Up to Email : email need to '@', <br />password min length is 5,<br />
                    max length is 18 with alphabets and numbers <br /> name field will be used as nickname</FormHelperText>
                {/* style={{height:100}} size='small' variant="outlined" filled={true} >Login to Email.</FormHelperText> */}
            </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
            <Grid><Button className="acc_button"
                onClick={signup_button_pressed}
                style={{width:300}}
                >SIGNUP → </Button></Grid>
            {/* <Grid><Button className="acc_button"
                onClick={pw_changed}
                style={{width:300}}
                >SOCIAL LOGIN</Button></Grid>
            <Grid><Button className="acc_button"
                style={{width:300}}
                >SIGNIN</Button></Grid> */}
        </Grid>
    </Grid>
    </div>);
}
