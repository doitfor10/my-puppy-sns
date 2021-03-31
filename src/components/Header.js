import React from 'react';
import { Grid, Text, Button } from '../elements';
import { history } from '../redux/configStore';
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"
import { apiKey } from '../shared/firebase';

const Header = (props) => {
  
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;


  if (is_session && is_login) {
    return (
        <React.Fragment>
          <Grid is_flex padding="4px 16px">
            <Grid>
              <Text margin="0px" size="24px" bold logo _onClick={() => {history.push('/')}}>멍멍그램</Text>
            </Grid>
            <Grid is_flex>
              <Button padding="7px 5px" margin="0px 3px" text="내정보"></Button>
            <Button padding="7px 5px" margin="0px 3px" text="로그아웃" _onClick={() => { dispatch(userActions.logOutFB()); }}></Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )
  }

return (
<React.Fragment>
  <Grid is_flex padding="4px 16px" margin="10px 0px">
    <Grid>
      <Text margin="0px" size="24px" bold logo _onClick={() => {history.push('/')}}>멍멍그램</Text>
    </Grid>
    <Grid is_flex>
      <Button padding="7px 5px" margin="0px 3px" text="로그인" _onClick={() => {
        history.push('/login')
      } }></Button>
      <Button padding="7px 5px" text="회원가입"_onClick={() => {
        history.push('/signup')
      } }> </Button>
    </Grid>
  </Grid>
</React.Fragment>
)
 
};

export default Header;