import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'; 

const Posts = ({setCurrentId}) =>{
    const { posts, isLoading } = useSelector((state) =>  state.posts);
       
    const classes = useStyles();

    if (!posts && !isLoading) return 'No available posts at the momment, you can create your own posts for others to see!!!'
    return (
        isLoading ? <CircularProgress/> : (
        <Grid className={classes.container} container alignItems='stretch' spacing={3}>
            {posts.map((post) =>{
                return(
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post= {post} setCurrentId={setCurrentId}/>
                </Grid>)
            })}
        </Grid>)
    )
}

export default Posts;