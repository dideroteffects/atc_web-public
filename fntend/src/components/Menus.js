import * as React from "react";
import ReactDOMClient from 'react-dom/client';
import {createBrowserRouter, Outlet, RouterProvider,
    useRouteError, useNavigate, Link} from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography, SvgIcon} from "@material-ui/core";

import StoryAtachi from "./StoryAtachi";
import StoryMems from "./StoryMems";
import Acc from "./Acc";
// import AccLogin from "./AccLogin";
// import AccLogout from "./AccLogout";

function Menus(){
    
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
                path:'atcstory',
                element: <StoryAtachi />,
            },
            {
                path:'memstory',
                element: <StoryMems />,
            }
        ]
    },
    {
        path: '/fnt/me/',
        element: <Acc />,
        errorElement: <ErrorBoundart />,
        // children: [
        //     {
        //         path:'login',
        //         element: <AccLogin />,
        //     },
        //     {
        //         path:'logout',
        //         element: <AccLogout />,
        //     }
        // ]
    }
])

function ErrorBoundart(){
    let err = useRouteError();
    console.log(err)
    return <div>Dang</div>
}

ReactDOMClient.createRoot(document.getElementById("router")).render(
    <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
