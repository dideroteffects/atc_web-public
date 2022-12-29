import React, { useState, useEffect } from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {Grid, Button, Typography, TextField, Collapse} from "@material-ui/core";

const StroyDetail = ()=>{
    const [Title, SetTitle] = useState('');
    const [Body, SetBody] = useState('');

    const location = useLocation();
    const [NoteId,SetNoteId] = useState(1);
    useEffect(()=>{
        try{
            SetNoteId(location.state.id)
            SetTitle(location.state.title);
            SetBody(location.state.body);
        }catch(e){console.log(e)}
    });


    return(
        <Grid>

            <Grid container spacing={1} align="center">
                <Grid item xs={12} style={{height:20}} />
                
                <Grid item xs={12}>
                    <TextField id="cli_title" className="stry_text"

                    placeholder={Title}
                    inputProps={{ readOnly: true, }}

                    // variant="standard"
                    xs={ 3 }
                    style={{width: 500, margin:5}}></TextField>
                    
                </Grid>
                <Grid item xs={12}>
                <TextField id="cli_body" className="stry_text"

                    placeholder={Body}
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
            
        </Grid>
    )
};

export default StroyDetail;