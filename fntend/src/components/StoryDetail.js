import React, { useState, useEffect } from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";

const StroyDetail = ()=>{
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');
    const [Heart, SetHeart] = useState(0);
    const location = useLocation();
    const [NoteId,SetNoteId] = useState(1);

    useEffect(()=>{
        try{
            SetNoteId(location.state.id)
            SetTitle(location.state.title);
            SetBody(location.state.body);
            SetHeart();
        }catch(e){console.log(e)}
    },[NoteId]);

    function HeartPressed(e){

        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                title: Title,
                body: Body,
                heart: 3,
                writer:1,//python view 단에서 세션 유저로 처리 - 유효성 검사만 통과하는 목적
            })
        };

        fetch(`/rest-note/update/${NoteId}`,requestOptions).then((response)=>{
                
                if(response.ok){
                    return response.json();
                    
                }else{
                    // SetErrStory(true);
                    // SetErrCode(response.status);
                    // if(response.status == 405){
                    //     SetErrMsg("you did already write as this subject ... change subject name");
                    //     SetTitle('');
                    // }else if(response.status == 400){
                    //     SetErrMsg("please fill both of subject and description :) ")
                    // }
                    console.log(response.status);
                    
                }
                
            }
        ).then((data)=>{
            if(data){
                console.log("success update - from press update button : data =>"+data);
                // window.location.replace('/fnt/memstory')
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
                
                <Grid item xs={12}>
                    <TextField id="cli_title" className="stry_text"

                    defaultValue={Title}
                    inputProps={{ readOnly: true, }}
                    key={`${Math.floor((Math.random() * 1000))}-min`}

                    // variant="standard"
                    xs={ 3 }
                    style={{width: 500, margin:5, }}></TextField>
                    
                </Grid>
                <Grid item xs={12}>
                <TextField id="cli_body" className="stry_text"

                    defaultValue={Body}
                    inputProps={{ readOnly: true, }}

                    multiline={true}
                    maxRows={15}
                    minRows={8}
                    // variant="outlined"
                    // placeholder="story of yours - write on anything"
                    style={{width: 500, margin:5, marginBottom:25}}
                    >test</TextField>
                </Grid>
                
            </Grid>
            <Grid><Button onClick={HeartPressed}>HEART</Button></Grid>
        </Grid>
    )
};

export default StroyDetail;