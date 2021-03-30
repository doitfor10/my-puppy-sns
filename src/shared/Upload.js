import styled from "styled-components";
import React from "react";

const Upload = (props) => {

    return (
        <React.Fragment>
            <FIleInput type="file"/>
        </React.Fragment>
    )
}

const FIleInput = styled.input`
  outline: none;
`

export default Upload;