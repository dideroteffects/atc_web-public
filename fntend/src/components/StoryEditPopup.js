import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom';
import {useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";
import StoryDelete from "./StoryDelete";
import Popup from 'reactjs-popup';

const StoryEditPopup = (props)=>{

    const [EditId, SetEditId] = useState(props.editiconid);
    

    function EditButtonPressed(e){
        // console.log(EditId);
        // console.log(e);
    }

    return(

    <Grid container spacing={1} align="center"
    style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:80}}>
        {props.editid}
        <Grid item xs={12}><Button onClick={EditButtonPressed}>EDIT</Button></Grid>
        
        <Grid item xs={12}>

            {/* <Popup trigger={<span><Button onClick={}>DEL</Button></span>} nested modal>{CheckStoryDeletePopup()}</Popup> */}
            <Popup trigger={<span><Button onClick={()=>console.log(EditId)}>DEL</Button></span>} nested modal>
                <span><StoryDelete deleteid={EditId} /></span>
            </Popup>
            
        </Grid>
    </Grid>
    
    )
};
export default StoryEditPopup;