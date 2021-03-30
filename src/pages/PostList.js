import React from 'react';
import { Grid } from '../elements';
import { Post } from '../components';


const PostList = (props) => {
  
 

  return (
    <React.Fragment>
      <Grid bg="#FAF6EA">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post/>
      </Grid>
     

    </React.Fragment>
  )



}

export default PostList;