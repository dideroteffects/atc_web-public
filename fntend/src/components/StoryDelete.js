import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse, Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const StoryDelete = ()=>{

    const useStyles = makeStyles({
        modal : {backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:200}
    })

    return(
        <Grid container spacing={1} className="modal"
        style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:400, height:200}}>
            <Grid item xs={12} align="center">
            <Typography>are you sure delete?</Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <Button>DELETE</Button>
            <Button>CANCLE</Button>
            </Grid>
            
        </Grid>
    )
}

export default StoryDelete;