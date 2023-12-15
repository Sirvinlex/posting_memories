import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost,likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';

const Post = ({post, setCurrentId}) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedpost = post.likes.find((like) => like === (userId));

    const handleLike = async () =>{
      dispatch(likePost(post._id))
      if (hasLikedpost){
        setLikes(post.likes.filter((id) => id !== userId))
      }else{
        setLikes([...post.likes, userId])
      }
    }

    const Likes = () =>{
        if(likes.length > 0){
            return likes.find((like) => like === (userId))
            ? (
                <><ThumbUpAltIcon fontSize='small'/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : '' }`}</>
            ) : (
                <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Likes</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`);
    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title ={post.title}/>
            <div className={classes.overlay}>
                <Typography varient='h6'>{post.name}</Typography>
                <Typography varient='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (
                    <Button style={{color: 'white'}} size='small' onClick={() =>{setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize='medium'/>
                </Button>
                )}
            </div>
            <div onClick={openPost} className={classes.cardAction} style={{ cursor: 'pointer'}}>
            <div className={classes.details}>
                <Typography varient='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
             <Typography variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
             <CardContent>
                 <Typography variant='body2' color='textSecondary'  component='p'>{post.message}</Typography>
            </CardContent>
            </div>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result}
                 onClick={handleLike}>
                    <Likes/>
                </Button>
                {(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (
                     <Button size='small' color='primary' onClick={() =>{dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize='small'/>
                    Delete
                </Button>
                )}
               
                
            </CardActions>
        </Card>
    )
}

export default Post;