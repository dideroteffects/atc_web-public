import React, { useEffect, useState } from "react";
import {json, useLocation, useNavigate} from "react-router-dom";
import {Grid, Button, Typography, Box,
    TextField, FormControl, FormHelperText, Collapse, SvgIcon,
    Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const StoryMems = ()=>{
    const [StoryList,SetStoryList] = useState([]);
    const [ActiveUserId, SetActiveUserId] = useState('');
    const [EditPressed, SetEditPressed] = useState(false);

    const history = useNavigate();

    useEffect(()=>{//액티브유저 세션 및 아이디 가져 옴
        
        fetch('/dj-rest-auth/user/detail/').then((response)=>
            {if(response.ok){
                
                return response.json();
                
            }else{
                console.log(response)
            }}
        ).then((data)=>{
            SetActiveUserId(data.id);
        })
    },[])

    function EditIconPressed(e){
        if(EditPressed==false){SetEditPressed(true)}else{SetEditPressed(false)}
    }
    function EditPOP(){
        if(EditPressed){
            return(<div>hello</div>)
        }
        
    }
    function CreateButtonPressed(e){
        
        history('/fnt/memstory/create');

    }

    useEffect(//이미 작성되어 있는 스토리의 내역을 불러 옴
        ()=>{
            const requestOptions = {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            };
            fetch('/rest-note/list',requestOptions).then(
                (res)=>{if(res.ok){return res.json()}else{console.log(res)}}
            ).then((data)=>{
                SetStoryList(data);
            });
        },[]
    )
    
    
    return(
    <div>
    
        <Grid container spacing={1}>
            <Grid item xs={12} style={{height:50}} />
            <Grid item xs={12} align="right" style={{marginRight:50}}>
                <Button color="primary" variant="contained"
                onClick={CreateButtonPressed}>Create</Button>
            </Grid>
            <Grid item xs={12} style={{margin:50}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell><Collapse></Collapse></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {StoryList.map((stlst)=>(
                    <TableRow>
                        <TableCell><Typography style={{fontSize:12}}>{stlst.id}</Typography></TableCell>
                        <TableCell key="title-{stlst.id}"><Typography size='small'>
                            {stlst.title.substr(0,20)}{stlst.title.length>20?' ...':''}</Typography></TableCell>
                        <TableCell key="body-{stlst.id}"><Typography style={{color:'#959595', fontSize:12}} size='small'>
                            {stlst.body.substr(0,40)}{stlst.body.length>40?' ...':''}</Typography></TableCell>
                        <TableCell key="created_at-{stlst.id}"><Typography style={{color:'#959595', fontSize:12}} size='small'>
                            {stlst.created_at.split('T')[0]}</Typography></TableCell>
                        <TableCell key="edit_svg-{stlst.id}">
                            {stlst.writer==ActiveUserId?
                            <Button onClick={EditIconPressed}><SvgIcon>
                            <path fill="currentColor" d="M18.9 9.2C18.1 10.1 16.6 11 15 11C13.5 11 12.6 10.5 11.8 10.1C11 9.8 10.2 9.3 8.9 9.3C7.7 9.3 6.6 10 6 10.6L5 9.1C5.9 8.2 7.3 7.2 8.9 7.2C10.4 7.2 11.3 7.8 12.1 8.1C12.9 8.4 13.7 9 15 9C16.2 9 17.3 8.2 17.9 7.6L18.9 9.2M19 14.1C18.1 15 16.7 16 15.1 16C13.6 16 12.7 15.5 11.9 15.1C11.1 14.8 10.3 14.2 9 14.2C7.8 14.2 6.7 15 6.1 15.6L5.1 14C6 13.1 7.4 12.1 9 12.1C10.5 12.1 11.4 12.6 12.2 13C13 13.3 13.8 13.8 15.1 13.8C16.3 13.8 17.4 13 18 12.4L19 14.1Z" />
                            </SvgIcon></Button>
                        :''}</TableCell>
                    </TableRow>
                    
                ))}
                </TableBody>
                </Table>
                <Grid>{EditPOP()}</Grid>
            </Grid>
            {/* {ActiveUser} */}
            
        </Grid>
    </div>
    )
}

export default StoryMems