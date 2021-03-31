import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore, storage } from '../../shared/firebase';
import 'moment';
import moment from 'moment';
import { actionCreators as imageActions } from './image';

const SET_POST = "SET_POST"; //목록가져오기
const ADD_POST = "ADD_POST"; //추가하기
const EDIT_POST = "EDIT_POST"; //수정하기
const DELETE_POST = "DELETE_POST"; //삭제하기
const LOADING = "LOADING"; //게시글 페이지 로딩 여부

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loding) => ({ is_loding }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {

  //게시글 이미지
  image_url : "https://cdn.pixabay.com/photo/2017/06/24/09/13/dog-2437110_1280.jpg",
  contents : "",
  post_like : 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

const editPostFB = (post_id = null, post = {}) => {
  
  return function (dispatch, getState, { history }) {
    
    if (!post_id) {
      window.alert('게시물 정보가 없습니다!');
      history.replace('/');
      return;
    }

    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection('post');

    //이미지 같은 경우에는 새로 업로드 안함.
    if (_image === _post.image_url) {
      
      postDB.doc(post_id).update(post).then(doc => {
        dispatch(editPost(post_id, { ...post }));
        history.replace('/');
      })
      return;
    } else {
      
      const user_id = getState().user.user.uid;
      
      const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`).putString(_image, 'data_url');
      _upload.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => url).then((url) => {
          postDB.doc(post_id).update({ ...post, image_url: url }).then(doc => {
            dispatch(editPost(post_id, { ...post, image_url: url }));
            history.replace('/');
          })
        }).catch((err) => {
          window.alert('이미지 업로드에 문제가 생겨 게시글 수정이 되지 않았습니다!');
          console.log(`이미지 업로드에 문제가 생겨 게시글 수정이 되지 않았습니다! ${err}`)
        })
      })
    }

  };
};

const addPostFB = (contents = "",) => {
 
  return function (dispatch, getState, { history }) {
  
     const postDB = firestore.collection('post');

    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    }
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
    };
    const _image = getState().image.preview;
    console.log(_image);
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        return url;
      }).then((url) => {
        postDB.add({ ...user_info, ..._post, image_url: url }).then((doc) => {
          let post = { user_info, ..._post, id: doc.id, image_url: url };
          dispatch(addPost(post));
          history.replace('/');
          dispatch(imageActions.setPreview(null));
        }).catch((err) => {
          window.alert('앗! 포스트 작성에 문제가 있어요!');
          console.log("post 작성에 실패했어요!", err);
        });
      }).catch((err) => {
        window.alert('앗!이미지 업로드에 문제가 있어요!');
        console.log('앗! 이미지 업로드에 문제가 있어요!', err);
      });
    });

  };
};

const getPostFB = (start = null, size = 3)=>{
  return function (dispatch, getState, { history }) {
  
    //다음 글 없으면 그냥 리턴.
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }

    //들어오자마자 로딩 시작.
    dispatch(loading(true));
    const postFB = firestore.collection('post');
    let query = postFB.orderBy('insert_dt', 'desc');

    //첫번째 이후 가져올때는 시작점을 지정해준다. 
    if (start) {
      query = query.startAt(start);
    }

    query.limit(size + 1).get().then(docs => {
      let post_list = [];
      let paging = {
        start: docs.docs[0],
        next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
        size: size,
      }

      docs.forEach((doc) => {
        let _post = doc.data();
        let post = {
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id : _post.user_id,
          },
          contents: _post.contents,
          image_url: _post.image_url,
          post_like: _post.post_like,
          insert_dt: _post.insert_dt
        }
        
        post_list.push(post);
      });
      post_list.pop();
      dispatch(setPost(post_list, paging));
    })
  };
}

const getOnePostFB = (id) => {
  return function (dispacth, getState, { history }) {
    const postDB = firestore.collection('post');
    postDB.doc(id).get().then(doc => {
     
      let _post = doc.data();
      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );

      dispacth(setPost([post]))

    })
    
  }
};

const deletePostFB = (post_id) => {
  
  return function (dispatch, getState, { history }) {
    const _post = getState().post.list.find((post) => post.id === post_id);
    console.log(`deletePostFB 확인용: ${_post}`);
    if (!_post) {
      return;
    }
    const postDB = firestore.collection('post');
    postDB.doc(_post.id).delete().then((docRef) => {
      
      dispatch(deletePost(post_id));
      history.replace('/');

    }).catch(err => {
      console.log(`post delete fail ${err}`);
    })


  };  
}

export default handleActions({

  [SET_POST]: (state, action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

    draft.list = draft.list.reduce((acc, cur) => {
     
      if (acc.findIndex(a => a.id === cur.id) === -1) {
        return [...acc, cur];
      } else {
        acc[acc.findIndex(a => a.id === cur.id)] = cur;
        return acc;
      }
     },[]);
    if (action.payload.paging) {
      draft.paging = action.payload.paging;
    }
    
    draft.is_loading = false;
  }),
  [ADD_POST]: (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.post);
  }),
  [EDIT_POST]: (state, action) => produce(state, (draft) => {
    let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
  }),
  [DELETE_POST]: (state, action) => produce(state, (draft) => {
    let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    draft.list.splice(idx,1);
  }),
  [LOADING]: (state, action) => produce(state, (draft) => {
    draft.is_loading = action.payload.is_loading;
  }),

},initialState);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  editPostFB,
  addPostFB,
  getPostFB,
  getOnePostFB,
  deletePostFB

};

export { actionCreators };