import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";

const StroyEdit = ()=>{
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');
    
    const [ErrStory, SetErrStory] = useState(false);
    const [ErrCode, SetErrCode] = useState(0);
    const [ErrMsg, SetErrMsg] = useState('');
    
    const location = useLocation();
    const [NoteId,SetNoteId] = useState(1);


    useEffect(()=>{
        try{
            SetNoteId(location.state.id);
            SetTitle(location.state.title);
            SetBody(location.state.body);
            console.log('Set changed - from state');
        }catch(e){console.log(e)};
    },[NoteId])


    function title_changed(e){
        SetTitle(e.target.value);
        console.log('title changed - from client');
    }
    function body_changed(e){
        SetBody(e.target.value);
        console.log('body changed - from client');
    }
    function UpdatePressed(e){

        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                title: Title,
                body: Body,
                writer:1,//python view 단에서 세션 유저로 처리 - 유효성 검사만 통과하는 목적
            })
        };

        fetch(`/rest-note/update/${NoteId}`,requestOptions).then((response)=>{
                
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
                    }
                    console.log(response.status);
                    
                }
                
            }
        ).then((data)=>{
            if(data){
                console.log("success update - from press update button : data =>"+data);
                window.location.replace('/fnt/memstory')
            };
        }).catch((err)=>{
            console.error(err.message);
            console.log(err.message);
        })

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
                    label="subject" InputLabelProps={{shrink:true}}
                    key={`${Math.floor((Math.random() * 1000))}-min`}
                    onBlur={title_changed}
                    error={(ErrCode==405 | (ErrCode==400 & Title==''))?true:false}

                    defaultValue={Title}
                    variant={(ErrCode==405 | (ErrCode==400 & Title==''))?"outlined":"standard"}
                    xs={ 3 }
                    style={{width: 500, margin:5}}
                    >
                        
                    </TextField>
                    
                </Grid>
                <Grid item xs={12}>
                <TextField id="cli_body" className="stry_text"
                    label="description" InputLabelProps={{shrink:true}}
                    // onChange={body_changed}
                    onBlur={body_changed}
                    error={ErrCode==400 & Body==''?true:false}

                    defaultValue={Body}

                    multiline={true}
                    maxRows={15}
                    minRows={8}
                    variant="outlined"
                    style={{width: 500, margin:5, marginBottom:25}}
                    ></TextField>
                </Grid>
                
                <Grid item xs={12}>
                    <Button onClick={UpdatePressed}
                    color="primary" variant="contained" style={{width:200}}
                    >UPDATE STORY</Button>
                </Grid>
            </Grid>
            
        </Grid>
    )
};

export default StroyEdit;