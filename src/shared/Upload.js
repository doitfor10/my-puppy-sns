import styled from "styled-components";
import React from "react";
import { Button } from '../elements';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from '../redux/modules/image';

const Upload = (props) => {

    const fileInput = React.useRef();
    const is_uploading = useSelector(state => state.image.uploading);
    const dispatch = useDispatch();
    const selectFile = (e) => {
        //파일 읽기 객체
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        //넣어놓은 파일 내용을 읽어온다.
        reader.readAsDataURL(file);
        //읽기가 끝나면 여기에 넣어둔 것이 실행된다.
        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    const uploadFB = () => {
        
        if (!fileInput.current || fileInput.current.files.length == 0) {
            window.alert('파일을 선택해주세요!');
            return;
        }
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    }

    return (
        <React.Fragment>
            <FIleInput type="file" ref={fileInput} onChange={selectFile} disabled={is_uploading} />
            {/* <Button _onClick={uploadFB} margin="10px 0px 0px 0px">업로드하기</Button> */}
        </React.Fragment>
    )
}

const FIleInput = styled.input`
  outline: none;
`

export default Upload;