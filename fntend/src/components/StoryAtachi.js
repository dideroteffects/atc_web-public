import React, { useState } from "react";
import {createBrowserRouter, RouterProvider, useLocation, useEffect, useNavigate, Link} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, TextField, FormControl, Input, FormHelperText} from "@material-ui/core";


const StoryAtachi = ()=>{
    return(
    <div>
        <Grid container spacing={1}>
            <Grid item xs={12} align="center" style={{height:300}}></Grid>
            <Grid item xs={12} align="center">
                <Typography className="phrase">
                    일, 관계, 휴식<br />
                    조화로운 삶을 살길 바래요
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography className="phrase">
                    서투르면 연습하면 돼요<br />
                    뚝딱거리며 매일 뭔가를 만드는<br />
                    캐릭터 아타치처럼<br />
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography className="phrase">
                    나에게도 타인에게도<br />
                    상냥하게 대해 주세요
                </Typography>
            </Grid>
        </Grid>
    </div>
    )
}

export default StoryAtachi