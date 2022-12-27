import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useLocation, useEffect, useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";

const StoryEditPopup = (props)=>{
    return(
    <Grid container spacing={1} align="center"
    style={{backgroundColor: '#f4f4f4', borderInline:10, opacity:0.9, width:80}}>
        {/* {props.editid} */}
        <Grid item xs={12}><Button>EDIT</Button></Grid>
        <Grid item xs={12}><Button>DELETE</Button></Grid>
    </Grid>
    )
};
export default StoryEditPopup;