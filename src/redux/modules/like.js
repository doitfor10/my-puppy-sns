import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as postActions } from './post';
import { firestore } from '../../shared/firebase';
import firebase from 'firebase/app'

const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const setLike = createAction(SET_LIKE, (likeList) => ({ likeList }));
const addLike = createAction(ADD_LIKE, (like) => ({ like }));
const deleteLike = createAction(DELETE_LIKE, (like_id) => ({ like_id }));

const initialState = {
  list:[],
}

const getLikeFB = (user_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!user_id) {
      return;
    }
    
    const likeDB = firestore.collection('like');
    likeDB.where('user_id', '==', user_id).get().then((docs) => {
      
      let list = [];
      
      docs.forEach((doc) => {
        
      
        list.push({ ...doc.data(), id: doc.id });
        
      });
      //forEach문 안에서 하고 있었잖아!!!
      dispatch(setLike(list));
    }).catch(err => {
      console.log('좋아요 목록을 가져올 수가 없습니다!',err);
    });

  }
};

const addLikeFB = (post_id=null) => {
  return function (dispatch, getState, { history }) {
    
    if (!post_id) {
      return;
    }
    const likeDB = firestore.collection('like');
    const user_info = getState().user.user;

    let like = {
      user_id: user_info.uid,
      post_id: post_id
    };
    likeDB.add(like).then((doc) => {
      
      const postDB = firestore.collection('post');
      const post = getState().post.list.find((p) => p.id === post_id);
      const increment = firebase.firestore.FieldValue.increment(1);
      like = { ...like, id: doc.id };
      postDB.doc(post_id).update({ post_like: increment }).then((_post) => {
        dispatch(addLike(like));
        
        if (post) {
          dispatch(postActions.editPost(post_id, { post_like: parseInt(post.post_like) + 1 }));
        }
      });
    });
  };
};

const deleteLikeFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    
    const user_info = getState().user.user;
    const likeDB = firestore.collection('like');
    const post = getState().post.list.find((p) => p.id === post_id);
    likeDB.where('user_id', '==', user_info.uid).get().then((docs) => {
      
      let list = [];
      
      docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
        
      });
      const likePost = list.find((l) => l.post_id === post_id);
      if (!likePost) {
        return;
      }
      likeDB.doc(likePost.id).delete().then((docRef) => {
        
        const postDB = firestore.collection('post');
        const increment = firebase.firestore.FieldValue.increment(-1);
        postDB.doc(post_id).update({ post_like: increment }).then((_post) => {
          dispatch(deleteLike(likePost.id));
          dispatch(postActions.editPost(post_id, { post_like: parseInt(post.post_like) - 1 }));
        });
      });
      }
      
    )}
}
  
export default handleActions(
  {

    [SET_LIKE]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.likeList;
    }),
    [ADD_LIKE]:(state, action) => produce(state, (draft) => {
      draft.list.push(action.payload.like);
    }),
    [DELETE_LIKE]:(state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((l) => l.id === action.payload.like_id);
      draft.list.splice(idx, 1);
    })
  },initialState
);

const actionCreators = {
  getLikeFB,
  addLikeFB,
  deleteLikeFB
};

export { actionCreators};