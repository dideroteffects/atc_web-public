import React, { useState } from "react";
import ReactDom from 'react-dom';
import {useEffect, useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";
import StoryDelete from "./StoryDelete";
import Popup from 'reactjs-popup';

const StoryEditPopup = (props)=>{

    const [EditId, SetEditId] = useState(props.editid);

    function EditButtonPressed(){

    }
    function DeleteButtonPressed(){

    }

    // const PopupDom = ({children}) => {
    //     const el = document.getElementById('popup_dom')
    //     return ReactDom.createPortal(children, el)
    // };

    return(
    <Grid container spacing={1} align="center"
    style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:80}}>
        {props.editid}
        <Grid item xs={12}><Button>EDIT</Button></Grid>
        <Grid item xs={12}>
            <Popup trigger={<Button>DELETE</Button>} modal nested>
                <StoryDelete />
            </Popup>
        </Grid>
            {/* <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} id="popup_dom"
            style={{ display: "flex", position: "fixed", backgroundColor: '#454545' }} align="center"></Grid></Grid> */}

    </Grid>
    
    )
};
export default StoryEditPopup;