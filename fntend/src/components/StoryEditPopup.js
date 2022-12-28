import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom';
import {useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";
// import StoryDelete from "./StoryDelete";
import Popup from 'reactjs-popup';





const StoryEditPopup = (props)=>{

    const [EditId, SetEditId] = useState(props.editid);
    const [CheckDeleteOpen, SetCheckDeleteOpen] = useState(false);
    const [DeleteSuccess, SetDeleteSuccess] = useState(false);

    function EditButtonPressed(){

    }
    function RealDeleteButtonPressed(e){
        
        // useEffect(()=>{
            const requestOptions = {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    id:EditId,
                })
            }

            fetch(`/rest-note/delete/${EditId}`,requestOptions
            ).then((response)=>{
                if(response.ok){
                    SetDeleteSuccess(true);
                    window.location.reload();
                }else{
                    console.log(response.status);
                }
            }
            )
        // },[])
    };

    //CheckDeletePOPUP
    const CheckStoryDeletePopup = ()=>{
        return(
            <Grid container spacing={1} className="modal"
            style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:400, height:200}}>
                <Grid item xs={12} align="center">
                    <Typography>ARE YOU SURE DELETE?</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button onClick={RealDeleteButtonPressed}>DELETE</Button>
                    <Button>CANCLE</Button>
                </Grid>
                
            </Grid>
        )
    }

    //EditPOPUP
    return(

    <Grid container spacing={1} align="center"
    style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:80}}>
        {props.editid}
        <Grid item xs={12}><Button>EDIT</Button></Grid>
        
        <Grid item xs={12}>

            {/* <Button onClick={RealDeleteButtonPressed}>DELETE</Button> */}
            <Popup trigger={<Button>DEL</Button>} nested modal>{CheckStoryDeletePopup()}</Popup>
            
        </Grid>

        <Button onClick={RealDeleteButtonPressed}>temp del</Button>
    </Grid>
    
    )
};
export default StoryEditPopup;