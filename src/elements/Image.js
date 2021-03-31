import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  
  //props로 받아와라!
  const { shape, src, size } = props;


  const styles = {
    src: src,
    size: size,
  }
  
  if (shape === "circle") {
    return (
      <ImageCircle {...styles}></ImageCircle>
    )
  }
  if (shape === 'rectangle') {
    return(
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    )

  }

  //기본 정사각형!
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>      
    </React.Fragment>
  )
  
}

Image.defaultProps = {
  shape: "circle", //이미지 모양
  src: "https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_1280.jpg",
  size: 38,

}

const ImageDefault = styled.div`
  --size:${(props) => props.size}px;
  width : var(--size);
  height: var(--size);
  background-image: url('${(props)=>props.src}');
  background-size: cover;
`;

const AspectOutter = styled.div`
  width:100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top:75%;  
  overflow : hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

//변수 규칙 var(--size)
const ImageCircle = styled.div`
  --size:${(props) => props.size}px;
  width : var(--size);
  height: var(--size);
  border-radius:var(--size);
  background-image: url('${(props)=>props.src}');
  background-size: cover;
  margin: 4px;
`;

export default Image;