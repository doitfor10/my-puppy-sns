import React from 'react';
import styled from "styled-components";
import { Text, Grid } from './index';

const Input = (props) => {
  
  const { label, placeholder, _onChange,type,multiLine,value,is_submit,onSubmit } = props;
  
  if (multiLine) {
    return (
      <Grid>
       { label && <Text margin="0px 0px 4px 0px">{label}</Text>}
        <ElTextarea placeholder={placeholder} onChange={_onChange} rows={10} value={value}/>
      </Grid>
    )
  }
  
  
  return (
    <React.Fragment>
      <Grid>
        { label && <Text margin="0px">{label}</Text>}
        {is_submit ? (<ElInput type={type} placeholder={placeholder} onChange={_onChange} value={value} onKeyPress={(e) => {
          if (e.key === "Enter") {
                //e.key가 enter일때 onSubmit으로 넘어온 함수를 실행한다.
                onSubmit();
              }
        }}/>):(<ElInput type={type} placeholder={placeholder} onChange={_onChange} />)}
        
      </Grid>
    </React.Fragment>
  )
}

Input.defaultProps = {
  label: false, 
  placeholder: '텍스트를 입력해주세요.',
  _onChange: () => { },
  type: 'text',
  multiLine: false, 
  value: "",
  is_submit: false,
  onSubmit: () => { },
}

const ElInput = styled.input`
  //border:1px solid #878585;
  width:100%;
  padding: 12px 4px;
  box-sizing:border-box;
  border:none;
  border-bottom: 1px solid #878585;
  outline: none;
  &:focus{
    outline: none;
  }
`;

const ElTextarea = styled.textarea`
  border:1px solid #212121;
  width:100%;
  padding: 12px 4px;
  box-sizing:border-box;
  resize: none;
  outline: none;
  &:focus{
    outline: none;
  }
`;


export default Input;