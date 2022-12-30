import React, { useEffect, useRef, useState } from "react";
import {json, useLocation, useNavigate, Navigate, Link} from "react-router-dom";
import {Grid, Button, Typography, Box,
    TextField, FormControl, FormHelperText, Collapse, SvgIcon,
    Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import Popup from 'reactjs-popup';
import Clickoutside from "./Clickoutside";
import { flushSync } from "react-dom";


const StoryMems = ()=>{
    const [StoryList,SetStoryList] = useState([]);
    const [ActiveUserId, SetActiveUserId] = useState('');
    const [EditIconId,SetEditIconId] = useState(0);
    const [DelButton,SetDelButton] = useState(false);
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
        SetEditIconId(e.currentTarget.value);
    }
            
    function CreateButtonPressed(e){
        
        history('/fnt/memstory/create');

    }
    function TitleDetailPressed(e){
        const detail_url = '/fnt/memstory/detail';
        GetSelectNoteIdFromServer(e, detail_url);

    }
    function DeleteButtonPressed(e) {
        console.log();
        // useEffect(()=>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: EditIconId,
            })
        }

        fetch(`/rest-note/delete/${EditIconId}`, requestOptions
        ).then((response) => {
            if (response.ok) {
                window.location.replace('/fnt/memstory');
            } else {
                console.log(response.status);
            }
        }
        )
        // },[])
    };

    function EditButtonPressed(e){
        const edit_url = '/fnt/memstory/edit';
        GetSelectNoteIdFromServer(e, edit_url);
    }

    function GetSelectNoteIdFromServer(e, url){//Note 혹은 Edit 버튼을 누르면 이동할 때, 디테일 API 서버 불러 옴
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id: e.currentTarget.value,
            })
        };

        fetch(`/rest-note/detail/${e.currentTarget.value}`,requestOptions).then((response)=>{
                
            if(response.ok){
                // console.log(response);
                return response.json();
                
            }else{
                
                console.log(response.status);
                
            }
            
        }
        ).then((data)=>{
            if(data){
                // console.log(data.title);
                // console.log(data);
                history(url,{state:data})
                    
            };
        }).catch((err)=>{
            console.error(err.message);
            console.log(err.message);
        },[])

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
    
    
    function CloseDelModal(){
        // alert("you clicked outside of modal popup");
        SetDelButton(false);
    }
    
    // useEffect(()=>{console.log("DelButton: "+DelButton)},[DelButton]);

    return(
    <div>
        <Grid container spacing={1}>
            <Grid item xs={12} style={{height:50}}/>
            <Grid item xs={12} align="right" style={{marginRight:50}}>
                <Button color="primary" variant="contained"
                onClick={CreateButtonPressed}>Create</Button>
            </Grid>
            <Grid item xs={12} style={{margin:0}}>
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
                    <TableRow key={stlst.id}>
                        <TableCell><Typography style={{fontSize:12}}>{stlst.id}</Typography></TableCell>
                        <TableCell><Button size='small' value={stlst.id} style={{width:100, marginLeft:"auto"}} onClick={TitleDetailPressed} >
                            {stlst.title.substr(0,20)}{stlst.title.length>20?' ...':''}</Button></TableCell>
                        <TableCell><Typography style={{color:'#959595', fontSize:12}} size='small'>
                            {stlst.body.substr(0,40)}{stlst.body.length>40?' ...':''}</Typography></TableCell>
                        <TableCell><Typography style={{color:'#959595', fontSize:12}} size='small'>
                            {stlst.created_at.split('T')[0]}</Typography></TableCell>
                        <TableCell>
                            {/* 로그인된 유저가 쓴 글이면 */}
                            {stlst.writer==ActiveUserId?
                            
                            // 눌렀을 때 트리거 버튼 설정 및 팝업 모듈
                                <Popup
                                    trigger={
                                        <span><Button
                                            onClick={EditIconPressed} value={stlst.id}
                                        >
                                            {/* 버튼 안 이미지 */}
                                            <SvgIcon>
                                                <path fill="currentColor" d="M18.9 9.2C18.1 10.1 16.6 11 15 11C13.5 11 12.6 10.5 11.8 10.1C11 9.8 10.2 9.3 8.9 9.3C7.7 9.3 6.6 10 6 10.6L5 9.1C5.9 8.2 7.3 7.2 8.9 7.2C10.4 7.2 11.3 7.8 12.1 8.1C12.9 8.4 13.7 9 15 9C16.2 9 17.3 8.2 17.9 7.6L18.9 9.2M19 14.1C18.1 15 16.7 16 15.1 16C13.6 16 12.7 15.5 11.9 15.1C11.1 14.8 10.3 14.2 9 14.2C7.8 14.2 6.7 15 6.1 15.6L5.1 14C6 13.1 7.4 12.1 9 12.1C10.5 12.1 11.4 12.6 12.2 13C13 13.3 13.8 13.8 15.1 13.8C16.3 13.8 17.4 13 18 12.4L19 14.1Z" />
                                            </SvgIcon>
                                        </Button ></span>}>

                                    {/* 팝업할 내용 */}
                                    {/* {EditPOP()} */}
                                    {/* <StoryDelete /> */}


                                    {(close)=>(<span>
                                        <Grid container spacing={1} align="center"
                                            style={{ backgroundColor: '#f4f4f4', marginRight:80, borderInline: 10, opacity: 0.9, width: 80 }}>
                                            <Grid item xs={12}>
                                                <Button onClick={EditButtonPressed} value={stlst.id}>EDIT</Button></Grid>
                                            <Grid item xs={12}>
                                                <Button onClick={() => { SetDelButton(true); close(); }}>DEL</Button>

                                            </Grid>
                                        </Grid>
                                    </span>)}


                                </Popup>

                                : ''}</TableCell>

                    </TableRow>

                ))}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={12}>
                
                <Popup open={DelButton} nested modal className='popup_modal'>
                    {(close) => (<span>

                        <Grid>
                            <Clickoutside closemodal = {CloseDelModal} testprop='hello' >
                            <Grid container spacing={1} className="modal"
                                style={{ backgroundColor: '#f4f4f4', borderInline: 10, opacity: 0.9, width: 400, height: 200 }}>
                                <Grid item xs={12} align="center">
                                    <Typography>ARE YOU SURE DELETE?</Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Button onClick={DeleteButtonPressed}>DELETE</Button>
                                    <Button onClick={() => { SetDelButton(false); close(); }}>CANCLE</Button>
                                </Grid>
                            </Grid>
                            </Clickoutside>
                        </Grid>

                    </span>)}

                </Popup>
                
            </Grid>
        </Grid>
    </div>
    )
}

export default StoryMems