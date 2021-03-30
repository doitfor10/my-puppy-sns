import React from 'react';
import { Grid, Text, Button } from '../elements';
import {history} from '../redux/configStore';
const Header = (props) => {
  
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

      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold logo _onClick={() => {history.push('/')}}>멍멍그램</Text>
        </Grid>
        <Grid is_flex>
           <Button padding="7px 5px" margin="0px 3px" text="내정보"></Button>
           <Button padding="7px 5px" margin="0px 3px" text="로그아웃" _onClick={() => { }}></Button>
        </Grid>
      </Grid>



    </React.Fragment>
  )

};

export default Header;