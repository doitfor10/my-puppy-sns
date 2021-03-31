import React, { useState } from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch} from 'react-redux'
import { actionCreators as userActions } from "../redux/modules/user"
import { emailCheck } from '../shared/common';

const Login = (props) => {
  
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const login = () => {
    
    if (!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다!');
    }
    dispatch(userActions.loginFB(id, pw));
    
  };


  
  return (
    <React.Fragment>
        <Grid padding="16px 16px 50px 16px" shadow>
        <Text size="26px" bold>
          로그인
        </Text>
        {/* 작은 컴포넌트에서 면밀하게 주면 골치아파지니
        큰 컴포넌트에서 만들어놓은 컴포넌트를 사용해 조절하자! */}
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px" margin="0px 0px 12px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPw(e.target.value);
            }}
           
            
          />  
        </Grid>
        <Button text="로그인하기" disabled={id===''||pw===''?true:false} _onClick={() => {
          login();
        }} />

      </Grid>
    </React.Fragment>
  )

}

export default Login;