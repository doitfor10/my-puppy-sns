import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: '',
  uploading: false,
  preview: null,
}

//파이어베이스 업로드
//업로드 시작하면 업로딩 true, 끝나면 false
const uploadImageFB = (image) => {
  return function (dispacth, getState, { history }) {
    
    //업로딩 시작!
    dispacth(uploading(true));
    
    const _upload = storage.ref(`images/${image.name}`).put(image);
    _upload.then((snapshot) => {
      
      snapshot.ref.getDownloadURL().then((url) => {
        
        dispacth(uploadImage(url));
      });

    });
  };
};

export default handleActions({

  [UPLOADING]: (state, action) => produce(state, (draft) => {
    draft.uploading = action.payload.uploading;
  }),
  [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
    draft.image_url = action.payload.image_url;
    draft.uploading = false;
  }),
  [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
    draft.preview = action.payload.preview;
  }),
}, initialState);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
}

export { actionCreators };