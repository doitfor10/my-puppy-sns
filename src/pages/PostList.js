import React from 'react';
import { Grid } from '../elements';
import { Post } from '../components';
import {useSelector,useDispatch} from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from '../shared/InfinityScroll';
import {history} from '../redux/configStore'
const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  const dispatch = useDispatch();
 // const { history } = props;
 

  React.useEffect(() => {
    
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }

  }, []);


  return (
    <React.Fragment>
      <Grid bg="#FAF6EA" padding="0px 0px 10px 0px">
         <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next))
        }}
        is_next={paging.next? true : false}
        loading={is_loading}
      >
          {post_list.map((p, idx) => {
            
            if (user_info && p.user_info.user_id === user_info.uid){
              return (
                <Grid bg="#ffffff" key={p.id} _onClick={() => { history.push(`/post/${p.id}`) }} >
                  <Post {...p} is_me />
                </Grid>
              )
            } else {
              return (
                <Grid bg ="#ffffff" key={p.id} _onClick={() => {history.push(`/post/${p.id}`)} }>
                  <Post {...p} />
                </Grid>
              )
            }
          })}
       </InfinityScroll>
      </Grid>
    </React.Fragment>
  )
}

export default PostList;