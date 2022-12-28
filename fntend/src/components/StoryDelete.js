import React, { useState, useEffect } from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse, Box} from "@material-ui/core";
import Popup from 'reactjs-popup';

const StoryDelete = (props)=>{
    const [DeleteId, SetDeleteId] = useState(props.deleteid);

    function DeletePressed(e){
        console.log(DeleteId);
        // useEffect(()=>{
            const requestOptions = {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    id:DeleteId,
                })
            }

            fetch(`/rest-note/delete/${DeleteId}`,requestOptions
            ).then((response)=>{
                if(response.ok){
                    window.location.replace('/fnt/memstory');
                }else{
                    console.log(response.status);
                }
            }
            )
        // },[])
    };


    return(
        <Grid>
            <Grid container spacing={1} className="modal"
            style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:400, height:200}}>
                <Grid item xs={12} align="center">
                    <Typography>ARE YOU SURE DELETE?</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button onClick={()=>console.log('clicked!')}>DELETE</Button>
                    <Button onClick={()=>console.log('clicked!')}>CANCLE</Button>
                </Grid>
                
            </Grid>
                   
        </Grid>
    )
}

export default StoryDelete;


