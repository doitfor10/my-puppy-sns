import React from "react"; 
import { Button, Grid } from "../elements";
import { Header } from "../components";
import Permit from "./Permit";
import { Route } from "react-router-dom";
//히스토리 불러주기
import { ConnectedRouter } from "connected-react-router";
import {history } from "../redux/configStore"
import { PostList, Login, SignUp,PostWrite,PostDetail } from '../pages';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './style.scss';
import Spinner from './Spinner';
import { useDispatch,useSelector } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";

function App() {
  
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  

  React.useEffect(() => {

    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }

  }, []);

  return (
    
    <React.Fragment >
     
      <Grid bg="#ffffff" >
      <Header/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/Signup" exact component={SignUp} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
      </ConnectedRouter>

      </Grid>
      
      <Permit>
        <Button is_float _onClick={() => {
            history.push('/write');
          }}>
          <PostAddIcon />
        </Button>
      </Permit>
      
    </React.Fragment >
      )
  } 
export default App;