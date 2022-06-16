import React, { useState, useEffect} from 'react';
import useStyles from './styles';
import { TextField, Button, Typography,Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';

const Form = ({currentId, setCurrentId}) =>{
 const [postData, setPostData] = useState({ message:'', title:'', tags:'', selectedFile:'' })
 const post = useSelector((state) => currentId? state.posts.posts.find(p => p._id === currentId) : null)
 const dispatch = useDispatch();
 const history = useHistory();
 const classes = useStyles();
 const user = JSON.parse(localStorage.getItem('profile'));

 useEffect(() =>{
    if (post) setPostData(post);
 }, [post]);

 const clear = () =>{
    setPostData({ message:'', title:'', tags:'', selectedFile:'' })
    setCurrentId(null)
 };

 const handleSubmit = (e) =>{
     e.preventDefault()
     if(currentId){
         
     dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
    clear();
     }
     else{
         dispatch(createPost({ ...postData, name: user?.result?.name}, history));
         clear();
        }
 }

 if(!user?.result?.name){
     return (
         <Paper className={classes.paper}>
             <Typography variant='h6' align='center'>
                 Please sign in to create your own memories and like other other memories!
             </Typography>
         </Paper>
     )
 }


 
 
  return (
       <Paper className={classes.paper} elevation={6}>
           <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId? 'Editing' : 'Creating'} memmories</Typography>
                <TextField name='title'  variant='outlined'  value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})} label='Title' fullWidth/>
                <TextField name='message'  variant='outlined'  value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})} label='Message' fullWidth/>
                <TextField name='tags'  variant='outlined'  value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})} label='Tags' fullWidth/>
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile:base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      
            </form> 
      </Paper>
    )
}

export default Form;