import React from "react";
import { Grid, Text, Button, Image, Input } from '../elements';
import Upload from '../shared/Upload';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';


const PostWrite = (props) => {
  
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  React.useEffect(() => {
    
    //새로고침되었을 때.
    if (is_edit && !_post) {
      alert('포스트 정보가 없습니다!');
      history.goBack();
      return false;
    }

    //수정중일 때.
    if (is_edit) {
      
      dispatch(imageActions.setPreview(_post.image_url));
    }

    return () => dispatch(imageActions.setPreview(null));
    
  }, []);

  //is_edit 상태일 때를 판별.
  const [contents, setContents] = React.useState(_post ? _post.contents:'');
  const changeContents = (e) => {
    setContents(e.target.value);
  }

  const [check, setCheck] = React.useState(_post ? _post.post_layout:'normal');
  
  const changeCheck = (e) => {
    setCheck(e.target.value);
  }



  const addPost = () => {

    dispatch(postActions.addPostFB(contents,check));
  }

  const aditPost = () => {
    
    dispatch(postActions.editPostFB(post_id, {contents:contents,post_layout:check}));
    
  };

  if (!is_login) {
    
    return (
       <Grid margin="100px 0px" padding="16px" center bg="#ffffff">
        <Text size="32px" bold>앗, 잠깐!</Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button _onClick={() => {
          //뒤로가기 했을 때 그 전 페이지 못 보게.
          //지금있는 페이지에서 갈아끼우는게 replace
          history.replace('/');
         }}>로그인 하러가기</Button>
      </Grid>
    )
  }

  return (
      <React.Fragment>
        <Grid padding="16px" >
          <Text margin="0px 0px 12px 0px" size="25px" bold>
          { is_edit?'게시글 수정':'게시글 작성'}
          </Text>
          <Upload/>
        </Grid>

        <Grid >
          <Grid padding="16px">
            <Text margin="0px" size="22px" bold>
              미리보기
            </Text>
          </Grid>

         <Image shape="rectangle" src={preview?preview:'https://mail.google.com/mail/u/0?ui=2&ik=703ff4b5cb&attid=0.1&permmsgid=msg-a:r-2735783013664226676&th=178893372da4318f&view=fimg&sz=s0-l75-ft&attbid=ANGjdJ8epG-2rjD7HGguzvw_hutsrulRLUK0iqSn9o9sVrFU1Mu21BJTqvkTpmoIB5jLAbKbQxu_AUSaKWK7gUqu13KmLx_8huktWDSDyMzG4_0QwEX7PjpgaAsnlXc&disp=emb&realattid=ii_kmxot7fa0'}></Image>
        </Grid>
      <Grid is_flex width="65%" margin="10px 0px 0px 12px">
        <Text size="14px" bold>게시글 레이아웃 정렬</Text>
        <Input label="left" radio radioName="post_layout" value="left" _onChange={changeCheck} checked={check ==='left'}/>
        <Input label="normal" radio radioName="post_layout" value="normal" _onChange={changeCheck} checked={check ==='normal'}/>
        <Input label="right" radio radioName="post_layout" value="right" _onChange={changeCheck} checked={check ==='right'}/>
        </Grid>
        <Grid padding="16px" margin="4px 0px">
          <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine value={contents}/>
        </Grid>

        <Grid padding="16px">
          {is_edit ? (<Button text="게시글 수정" disabled={ contents==='' || preview ==null?true:false} _onClick={aditPost}></Button>) :
          (<Button text="게시글 작성" disabled={ contents==='' || preview ==null?true:false} _onClick={addPost}></Button>)}
        </Grid>
      </React.Fragment>
  )

};

export default PostWrite;