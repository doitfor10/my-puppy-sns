import React from "react"; 
import styled from "styled-components";
import { Button, Grid } from "../elements";
import {Header} from "../components";
import { BrowserRouter, Route } from "react-router-dom";
//히스토리 불러주기
import { ConnectedRouter } from "connected-react-router";
import {history } from "../redux/configStore"
import { PostList, Login, SignUp,PostWrite } from '../pages';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './style.scss';

const App = () => { 
    
  return (
    <React.Fragment>
      <Grid>
      <Header/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/Signup" exact component={SignUp} />
        <Route path="/write" exact component={PostWrite} />
      </ConnectedRouter>

      </Grid>
      
       <Button is_float _onClick={() => {
          history.push('/write');
        }}><PostAddIcon/></Button>

    </React.Fragment>
    
    ); 
} 
export default App;