import { createAction,handleActions } from 'redux-actions'; //액션관리 편하게!
import { produce } from 'immer'; //불변성 관리를 편하게!
import {auth} from '../../shared/firebase';
import firebase from 'firebase/app';
import { setCookie,deleteCookie } from '../../shared/Cookie'

//action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USET";

//action creator
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({user}));


const initialState = {
  user: null, //info
  is_login: false,
};

const user_initial = {
  user_name: 'puppy',
};

const loginFB = (id, pw) => {
  return function (dispacth, getState, { history }) {
    
    //session 잘 들어갔는지 확인.
    //리덕스 데이터는 새로고침시 날아가니 session에 정리.
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth.signInWithEmailAndPassword(id, pw).then((user) => {
      
      console.log(`modules user login user ${user}`)
      dispacth(setUser({
        user_name: user.user.displayName,
        id: id,
        user_profile: '',
        uid: user.user.uid, //DB user id
      }));
       
      history.push('/'); //로그인 되었으니 메인홈으로!
      }).catch((error) => {
        let errorCode = error.code;
        let errorMsg = error.message;
        console.log(errorCode, errorMsg + ' 로그인 실패! ㅠㅠ');
        window.alert('아이디와 비밀번호가 일치하지 않습니다.');
    });    
    });
  };
};

//session이 날아가서 로그인 유지가 되지 않는다.
const logOutFB = () => {
  return function (dispacth, getState, { history }) {
    
    auth.signOut().then(() => {
      dispacth(logOut());
      //로그인시 보고있던 페이지를 보지 못하게
      //컴포넌트를 갈아끼운다. 
      history.replace('/');
    });
  };
};

const signupFB = (id, pw, user_name) => {
  return function (dispacth, getState, { history }) {
    
    auth.createUserWithEmailAndPassword(id, pw).then((user) => {
      

      auth.currentUser.updateProfile({
        displayName: user_name,
      }).then(() => {
        dispacth(setUser({
          user_name: user_name,
          id: id,
          user_profile: '',
          uid: user.user.uid
        }));

        //가입 성공! 메인페이지 이동.
        history.push('/');

      }).catch((error) => {
        console.log(`modules user updateProfile fail ${error.code}`);
      })

    }).catch((error) => {
      //firebase 자체에서 가입을 위해 만든 규칙이 있는데,
      //이를 안지키면 error가 날아온다. 
      //예를들어 비밀번호가 너무 짧을 때.
      let errorCode = error.code;
      let errorMsg = error.message;
      console.log(errorCode,errorMsg+' 회원가입 실패! ㅠㅠ');
    })

  };
};

//로그인 여부 체크 session 유무를 통해.
//리덕스에만 데이터를 저장해놓으면 새로고침시 날아간다.
//session 여부를 확인하여 관리. 
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    
    //auth에서 제공해주는 기능으로 유저가 있는지, 없는지 확인.
    //실행하는 동안에는 is_login true.
    auth.onAuthStateChanged((user) => {
     
      if (user) {
        dispatch(setUser({
          user_name: user.displayName,
          user_profile: '',
          id: user.email,
          uid: user.uid,
        }));
      } else {
        dispatch(logOut());
      }
    })
  };
};




//produce 불변성 유지를 도와줌! immer를 통해.
export default handleActions({
  [SET_USER]: (state, action) => produce(state, (draft) => {
    setCookie('is_login', 'success');
    draft.user = action.payload.user;
    draft.is_login = true; //로그인 유지!
    
  }),
  [LOG_OUT]: (state, action) => produce(state, (draft) => {
    deleteCookie('is_login');
    draft.user = null;
    draft.is_login = false;
  }),
  [GET_USER]: (state, action) => produce(state, (draft) => {
    
  }),

}, initialState);

//action creator export
const actionCreators = {
  logOutFB,
  signupFB,
  loginFB,
  loginCheckFB
};

export {actionCreators};

