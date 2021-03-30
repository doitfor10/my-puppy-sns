import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
 
  const { text, _onClick, is_float,children,margin,width,padding,bg,hoverBg,color } = props;
  
   const styles = {
    margin: margin,
    width: width,
    padding: padding,
    bg: bg,
    hoverBg: hoverBg,
    color:color
  }

  //fix 버튼
  if (is_float) {
    return (
      <React.Fragment>
      <FloatButton {...styles} onClick={_onClick}>{text? text:children}</FloatButton>
    </React.Fragment>
  )
  }

 

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={ _onClick}>{text? text:children}</ElButton>
    </React.Fragment>
  )
}

Button.defaultProps = {
  text: false,
  _onClick: () => { },
  is_float: false, //position: fixed를 사용하기 위해 추가.
  children: null,
  margin: false,
  width: '100%',
  padding: '12px 0px',
  bg: '#2F2D2D',
  hoverBg: '#ef6c00',
  color: '#ffffff',
  
}

const ElButton = styled.button`
  /* 기본값이 100%이니까 바로 주기. */
  width:${(props) => props.width};
  cursor: pointer;
  background-color: ${(props)=> props.bg};
  color:${(props)=>props.color};
  padding: ${(props) => props.padding};
  border:none;
  border-radius: 3px;
  box-sizing: border-box;
  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  transition: background-color .3s;
  outline: none;
  &:hover,:focus{
    background-color: ${(props) => (props.hoverBg)};
    outline: none;
  }
`;

const FloatButton = styled.button`
  width:60px;
  height: 60px;
  border-radius :100% ;
  background-color: ${(props)=> props.bg};
  color:${(props)=>props.color};
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  right:16px;
  bottom:80px;
  border:none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  outline: none;
  transition: background-color .3s;
  &:hover,:focus{
    background-color: ${(props)=>(props.hoverBg)};
    outline: none;
  }

  
`

export default Button;