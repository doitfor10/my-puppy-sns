import React from 'react';
import { useSelector} from "react-redux"; //로그인 여부 확인하기 위해.
import { apiKey } from "./firebase";

const Permit = (props) => {
  
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_session && is_login) {
    
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }

  return null;

}

export default Permit;