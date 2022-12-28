import React, { useState, useEffect } from "react";
import ReactDOMClient from 'react-dom/client';
import {createBrowserRouter, Outlet, RouterProvider,
    useRouteError, useNavigate} from "react-router-dom";
import {Grid, Button, Typography, SvgIcon} from "@material-ui/core";

import StoryAtachi from "./StoryAtachi";
import StoryMems from "./StoryMems";
import Acc from "./Acc";
import AccLogin from "./AccLogin";
import AccLogout from "./AccLogout";
import StroyCreate from "./StoryCreate";
import StroyDetail from "./StoryDetail";
import StoryEdit from "./StoryEdit";
import StoryDelete from "./StoryDelete";

function Menus(){
    const [ActiveUser,SetActiveUser] = useState('');
    useEffect(()=>{
        
        fetch('/dj-rest-auth/user/detail/').then((response)=>
            {if(response.ok){
                
                return response.json();
                
            }else{
                console.log(response)
            }}
        ).then((data)=>{
            SetActiveUser(data.username);
        })
    },[])
    const history = useNavigate();

    function menu_button_pressed(e){
        if (e.currentTarget.value == "atachistory"){
            history('/fnt/atcstory/');
        }else if (e.currentTarget.value == "membersstory"){
            history('/fnt/memstory/');
        }
    }
    
    
    return(
        <div style={{padding:10}}>
            <Grid container spacing={1} alignItems="center">

                <Grid container spacing={3} alignItems="center" >

                    <Grid item xs={5} align="right">
                        <Button onClick={menu_button_pressed}
                        className="menu_button" id="which_A"
                        style={{width:100}}
                        value="atachistory">Atachi</Button>
                    </Grid>
                    <Grid item xs={5} align="left">
                        <Button onClick={menu_button_pressed}
                        className="menu_button" id="which_M"
                        style={{width:100}}
                        value="membersstory">Story</Button>
                        
                    </Grid>
                    <Grid item xs={2} align="center">
                        <a href="/fnt/me/">
                        <SvgIcon color="primary">
                            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </SvgIcon>
                        </a>
                        <Typography style={{fontSize:9}}>{ActiveUser}</Typography>
                    </Grid>
                </Grid>

                

            </Grid>
            <Outlet />
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: '/fnt/',
        element: <Menus />,
        errorElement: <ErrorBoundart />,
        children: [
            {
                index: true,
                element: <StoryAtachi />,
            },
            {
                path:'atcstory',
                element: <StoryAtachi />,
            },
            {
                path:'memstory',
                element: <StoryMems />,
            },
            {
                path:'memstory/create',
                element: <StroyCreate />,
            },
            {
                path:'memstory/detail',
                element: <StroyDetail />,
                errorElement: <ErrorBoundart />,
            },
            {
                path:'memstory/edit',
                element: <StoryEdit />
            },
            {
                path:'memstory/delete',
                element: <StoryDelete />
            },
        ]
    },
    
    {
        path: '/fnt/me/',
        element: <Acc />,
        errorElement: <ErrorBoundart />,
        
        
    },
    {
        path:'/fnt/me/login',
        element: <AccLogin />,
    },
    {
        path:'/fnt/me/logout',
        element: <AccLogout />,
    }
])

function ErrorBoundart(){
    let err = useRouteError();
    console.log(err)
    return <div>Dang</div>
}

ReactDOMClient.createRoot(document.getElementById("router")).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
);
