import React from "react";
import { Text, Input, Grid, Button } from "../elements";

const Login = (props) => {
  
  return (
    <React.Fragment>
        <Grid padding="16px">
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
              
            }}
          />
        </Grid>

        <Grid padding="16px 0px" margin="0px 0px 12px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={(e) => {
              
            }}
           
            
          />
        </Grid>
        <Button text="로그인하기" _onClick={() => {
          console.log('로그인 했어!');
          
        }} />
      </Grid>
    </React.Fragment>
  )

}

export default Login;