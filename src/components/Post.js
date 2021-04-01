import React from 'react';
import { Button, Grid, Image, Text } from '../elements'
import { history } from '../redux/configStore'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch,useSelector } from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";


const Post =React.memo((props) => {
  
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const likeList = useSelector((state) => state.like.list);
  const userLikes = likeList.filter((l) => l.user_id == user_info?.uid);
  let isLike;
  if (userLikes) {
    isLike = userLikes.findIndex((l) => l.post_id === props.id) !== -1;
    
  }
 
 if (props.post_layout === 'left') {
    
    return (
      <React.Fragment>
        <Grid margin="0px 0px 15px 0px" bg="#ffffff" shadow>
          {/* 안에 내용들이 grid의 칠드런으로 들어간다.
            is_flex는 존재만으로 true */}
          <Grid is_flex padding="15px 16px 0px 16px" margin="0px 0px 10px 0px">
            {/* 자동으로 내용물 넓이만큼만 가지게 해라. auto */}
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src}></Image>
              <Text bold margin="0px 6px  ">{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text size="13px">{props.insert_dt}</Text>
              {props.is_me && <Button padding="4px" width="auto" margin="0px 2px 0px 8px"
                _onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/write/${props.id}`);
                }}>
                수정
                </Button>}
              {props.is_me && <Button padding="4px" width="auto" margin="0px 5px 0px 2px"
                _onClick={(e) => {
                  e.stopPropagation();
                  dispatch(postActions.deletePostFB(props.id));
                }}>
                삭제
                </Button>}
            </Grid>
          </Grid>
          <Grid is_flex>
            <Image layout shape="rectangle" src={props.image_url}></Image>
            <Grid is_flex>
              <Text margin="0px 0px 0px 12px">{props.contents}</Text>
          </Grid>
          </Grid>
          <Grid padding="16px" is_flex>
            <Text margin="0px" bold size="15px">좋아요 {props.post_like}개</Text>
            
             <FavoriteIcon style={{
                color: isLike?"#F59C9C":"#CBCBCB",
                cursor: "pointer",
            }} onClick={(e) => {
                
            e.stopPropagation();
              if (user_info && !isLike) {
                //좋아요 안함.
                dispatch(likeActions.addLikeFB(props.id));
             
              } else if (user_info && isLike) {
                dispatch(likeActions.deleteLikeFB(props.id));
              } else {
                window.alert('로그인 후 사용할 수 있습니다! :)');
              }
          }}/>

          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  if (props.post_layout === 'right') {
    return (
      <React.Fragment>
        <Grid margin="0px 0px 15px 0px" bg="#ffffff" shadow>
          {/* 안에 내용들이 grid의 칠드런으로 들어간다.
            is_flex는 존재만으로 true */}
          <Grid is_flex padding="15px 16px 0px 16px" margin="0px 0px 10px 0px">
            {/* 자동으로 내용물 넓이만큼만 가지게 해라. auto */}
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src}></Image>
              <Text bold margin="0px 6px  ">{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text size="13px">{props.insert_dt}</Text>
              {props.is_me && <Button padding="4px" width="auto" margin="0px 2px 0px 8px"
                _onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/write/${props.id}`);
                }}>
                수정
                </Button>}
              {props.is_me && <Button padding="4px" width="auto" margin="0px 5px 0px 2px"
                _onClick={(e) => {
                  e.stopPropagation();
                  dispatch(postActions.deletePostFB(props.id));
                }}>
                삭제
                </Button>}
            </Grid>
          </Grid>
          <Grid is_flex>
            <Grid is_flex>
              <Text margin="0px 0px 0px 12px">{props.contents}</Text>
            </Grid>
            <Image layout shape="rectangle" src={props.image_url}></Image>
          </Grid>
          <Grid padding="16px" is_flex>
            <Text margin="0px" bold size="15px">좋아요 {props.post_like}개</Text>
           <FavoriteIcon style={{
                color: isLike?"#F59C9C":"#CBCBCB",
                cursor: "pointer",
          }} onClick={(e) => {
            e.stopPropagation();
            if (user_info && !isLike) {
              //좋아요 안함.
              dispatch(likeActions.addLikeFB(props.id));
              
            } else if (user_info && isLike) {
              dispatch(likeActions.deleteLikeFB(props.id));
            } else {
                window.alert('로그인 후 사용할 수 있습니다! :)');
              }
          }}/>

          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  return (
     <React.Fragment>
        <Grid margin="0px 0px 15px 0px" bg="#ffffff" shadow>
        {/* 안에 내용들이 grid의 칠드런으로 들어간다.
          is_flex는 존재만으로 true */}
        <Grid is_flex padding="15px 16px 0px 16px">
          {/* 자동으로 내용물 넓이만큼만 가지게 해라. auto */}
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src}></Image>
            <Text bold margin="0px 6px  ">{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text size="13px">{props.insert_dt}</Text>
            {props.is_me && <Button padding="4px" width="auto" margin="0px 2px 0px 8px"
              _onClick={(e) => {
                e.stopPropagation();
                history.push(`/write/${props.id}`);
              }}>
              수정
              </Button>}
             {props.is_me && <Button padding="4px" width="auto" margin="0px 5px 0px 2px"
              _onClick={(e) => {
                e.stopPropagation();
                dispatch(postActions.deletePostFB(props.id));
              }}>
              삭제
              </Button>}
          </Grid>
        </Grid>
        <Grid padding="10px">
          <Text>{props.contents}</Text>

        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url}></Image>
        </Grid>
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold size="15px">좋아요 {props.post_like}개</Text>
          <FavoriteIcon style={{
                color: isLike?"#F59C9C":"#CBCBCB",
                cursor: "pointer",
          }} onClick={(e) => {
                
            e.stopPropagation();
            if (user_info && !isLike) {
              //좋아요 안함.
              dispatch(likeActions.addLikeFB(props.id));
              
            } else if (user_info && isLike) {
              dispatch(likeActions.deleteLikeFB(props.id));
            } else {
                window.alert('로그인 후 사용할 수 있습니다! :)');
              }
          }}/>

        </Grid>
      </Grid>
     </React.Fragment>
  )

})

Post.defaultProps = {
  //유저 정보
  user_info: {
    user_name: '댕댕이',
    user_profile: "",
  },
  //게시글
  image_url: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg",
  contents: "강아지가 세상을 구한다!",
  post_like: 10,
  insert_dt: "2021-03-01 10:00:00",
  is_me: false, //나라면 수정 가능.
  post_layout: 'normal',
};

export default Post;