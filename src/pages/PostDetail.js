import React from "react";
import Post from '../components/Post';
import { useSelector,useDispatch } from 'react-redux';
import { actionCreators as postActions} from "../redux/modules/post"
import Permit from '../shared/Permit';

const PostDetail = (props) => {
  
  const user_info = useSelector((state) => state.user.user);
  const id = props.match.params.id;
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />}
    </React.Fragment>

  )


}

export default PostDetail;