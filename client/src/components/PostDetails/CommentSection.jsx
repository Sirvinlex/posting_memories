import React, { useState, useRef, useEffect} from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; 

import useStyles from './styles';
import { commentPost, deleteComment,  } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const { posts } = useSelector((state) =>  state.posts);
    const myComment = posts.map((p) => p);
    const afterCommentDelete = myComment[0].comments;
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleClick = async () =>{
       const finalComment = `${user.result._id}: ${user.result.name}: ${comment}`;
       const newComment = await dispatch(commentPost(finalComment, post._id));
       setComments(newComment);
       setComment('');
       commentsRef.current.scrollIntoView({ behavior: 'smooth'})
       
    };
    useEffect(() =>{
        setComments(afterCommentDelete)
    }, [afterCommentDelete]);

   const removeComment = (i) => {
        dispatch(deleteComment(post._id, i))
    };
  return (
    <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>

                {comments.map((c, i) =>(
                    <Typography style={{margin:'2px 2px',padding:'2px 2px', backgroundColor:'#F0F0F0', borderRadius:'5px'}}
                     gutterBottom variant='subtitle1' key={i}>
                        <strong>{c.split(':')[1]}</strong> 
                        {c.split(':')[2]}
                        {(user?.result._id === post?.creator || c.split(':')[0] === user.result._id)  ? (
                            <Button size='small' color='primary' onClick={() => removeComment(i)}>
                         <DeleteIcon fontSize='small'/>
                          Delete
                        </Button>
                        ) : null}
                    </Typography>
                ))}
            

                <div ref={commentsRef}></div>
        </div>
        {user?.result?.name && (
            <div style={{ width: '70%'}}>
             <Typography gutterBottom variant='h6'>Write a Comment</Typography>
             <TextField
             fullWidth
             row={4}
             multiline
             variant='outlined'
             label='Comment'
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             />
             <Button style={{ marginTop: '10px'}} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                    Comment
             </Button>
        </div>
        )}
        
    </div>
  )
}

export default CommentSection;