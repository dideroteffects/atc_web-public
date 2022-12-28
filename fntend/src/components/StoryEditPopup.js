import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom';
import {useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";

const StoryEditPopup = (props)=>{

    const [EditId, SetEditId] = useState(props.editiconid);
    

    function EditButtonPressed(e){
        // console.log(EditId);
        // console.log(e);
    }

    return(

        <Grid container spacing={1} align="center"
            style={{ backgroundColor: '#f4f4f4', borderInline: 10, opacity: 0.9, width: 80 }}>
            <Grid item xs={12}>
                <Button onClick={() => { console.log('edit button clicked'); }}>EDIT</Button></Grid>
            <Grid item xs={12}>
                <Button onClick={() => { SetDelButton(true); }}>DEL</Button>

            </Grid>
        </Grid>
    
    )
};
export default StoryEditPopup;