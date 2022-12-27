import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useLocation, useEffect, useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";

const StroyCreate = ()=>{
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');
    const [ErrStory, SetErrStory] = useState(false);
    const [ErrCode, SetErrCode] = useState(0);
    const [ErrMsg, SetErrMsg] = useState('');
    const history = useNavigate();

    function title_changed(e){
        SetTitle(e.target.value)
    }
    function body_changed(e){
        SetBody(e.target.value)
    }
    function CreatePressed(){

        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                title: Title,
                body: Body,
                writer:1,//python view 단에서 세션 유저로 처리 - 유효성 검사만 통과하는 목적
            })
        };

        fetch('/rest-note/create',requestOptions).then((response)=>{
                
                if(response.ok){
                    return response.json();
                    
                }else{
                    SetErrStory(true);
                    SetErrCode(response.status);
                    if(response.status == 405){
                        SetErrMsg("you did already write as this subject ... change subject name");
                        SetTitle('');
                    }else if(response.status == 400){
                        SetErrMsg("please fill both of subject and description :) ")
                    }else if(response.status == 403){
                        SetErrMsg("could you log in?")
                    }
                    //console.log(response.status);
                    
                }
                
            }
        ).then((data)=>{
            if(data){
                window.location.replace('/fnt/memstory')};
        }).catch((err)=>{
            console.error(err.message);
            console.log(err.message);
        })

    }

    function LoginErr(){
        function NavLogin(){
            history('/fnt/me/');
        }
        if(ErrCode==403){
        return(
            <Grid item xs={12} >
                    <Button onClick={NavLogin}
                    color="secondary" variant="contained" style={{width:200}}
                    >LOG IN or SIGN IN</Button>
            </Grid>
        )
        }
    }

    return(
        <Grid>
            
            <Grid container spacing={1} align="center">
                <Grid item xs={12} style={{height:20}} />
                <Grid item xs={12} align="center">

                    <Collapse in={ErrStory} severity="error" >
                        <Typography color="secondary"
                            style={{ height: 20 }} size='small'>
                            {ErrMsg}
                        </Typography>
                    </Collapse>

                </Grid>
                <Grid item xs={12}>
                    <TextField id="cli_title" className="stry_text"
                    label="subject" 
                    onChange={title_changed}
                    error={(ErrCode==405 | (ErrCode==400 & Title==''))?true:false}

                    variant={(ErrCode==405 | (ErrCode==400 & Title==''))?"outlined":"standard"}
                    xs={ 3 }
                    style={{width: 500, margin:5}}></TextField>
                    
                </Grid>
                <Grid item xs={12}>
                <TextField id="cli_body" className="stry_text"
                    label="description" 
                    onChange={body_changed}
                    error={ErrCode==400 & Body==''?true:false}

                    multiline={true}
                    maxRows={15}
                    minRows={8}
                    variant="outlined"
                    placeholder="story of yours - write on anything"
                    style={{width: 500, margin:5, marginBottom:25}}
                    ></TextField>
                </Grid>
                
                {LoginErr()}

                <Grid item xs={12}>
                    <Button onClick={CreatePressed}
                    color="primary" variant="contained" style={{width:200}}
                    >CREATE STORY</Button>
                </Grid>
            </Grid>
            
        </Grid>
    )
};

export default StroyCreate;