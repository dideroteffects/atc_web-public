import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {Grid, Button, Typography,
    TextField, FormControl, FormHelperText, Collapse} from "@material-ui/core";

const StoryMems = (props)=>{
    useEffect(
        ()=>{
            const requestOptions = {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            };
            fetch('/rest-note/list',requestOptions).then(
                (res)=>{if(res.ok){return res.json()}else{console.log(res)}}
            ).then((data)=>{console.log(data)});
        }
    )
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');

    return(
    <div>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                {Title}
            </Grid>
            <Grid item xs={12}>
                {Body}
            </Grid>
            {/* {props} */}
        </Grid>
    </div>
    )
}

export default StoryMems